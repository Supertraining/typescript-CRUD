import { parentPort } from "worker_threads";
import PDFDocument from "pdfkit";
import type { IPdf } from "../interfaces/Pdf.interfaces.js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { supabaseClient } from "../../../core/db/supabase/supabase-client.core.db.supabase.js";
import { getDbTable } from "../../../core/utils/get-db-table.core.utils.js";
import { DB_BUCKETS } from "../../../core/constants/DB.constants.js";

const bucketName = getDbTable({ bucket_name: DB_BUCKETS.PDF });

class PdfWorker {
  private supabaseClient: SupabaseClient;
  constructor() {
    this.listenForMessages();
    this.supabaseClient = supabaseClient;
  }

  private async listenForMessages() {
    parentPort?.on("message", async (message) => {
      console.log(`3. 📩 PDF Worker threadId: ${message.threadId} received message:`);

      if (message.action === "create") {
        try {
          const pdfStream = this.generatePDF(message.data);
          // ✅ Convertimos el Stream a un `ReadableStream` compatible con `fetch()`
          const readableStream = pdfStream as unknown as ReadableStream;

          const fileName = `pdf_${Date.now()}.pdf`;
          const { error } = await supabaseClient.storage
            .from(bucketName)
            .upload(fileName, readableStream, {
              contentType: "application/pdf",
              duplex: "half",
            });

          if (error) throw new Error(error.message);

          // ✅ Generar una URL firmada con 1 hora de validez
          const { data, error: urlError } = await supabaseClient.storage
            .from(bucketName)
            .createSignedUrl(fileName, 3600);

          if (urlError) throw new Error(urlError.message);

          parentPort?.postMessage({ success: true, url: data.signedUrl });
        } catch (error: any) {
          console.error("❌ Error generating PDF:", error.message);
          parentPort?.postMessage({ success: false, error: error.message });
        }
      }
    });
  }

  // ✅ Generamos el PDF en memoria sin librerías adicionales
  private generatePDF(content: IPdf): NodeJS.ReadableStream {
    const doc = new PDFDocument();

    doc
      .fontSize(20)
      .font("Helvetica-Bold")
      .text(content.title, { align: "center", underline: true });
    doc.moveDown();
    doc.font("Helvetica").fontSize(16).text(content.mainText, { align: "justify" });
    doc.end();
    return doc;
  }
}

// ✅ Instanciamos el Worker
new PdfWorker();
