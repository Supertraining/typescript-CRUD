// src/workers/pdfWorker.ts
import { parentPort } from "worker_threads";
import PDFDocument from "pdfkit";
import { config } from "../../../config/config";
import { CustomError } from "../../../core/errors/customError";
import { SupabaseClient } from "../../../db/supabase/supabaseClient";
import { IPdf } from "../../../core/interfaces/iPdf";

const pdfTable = config.supabase.pdf_table;
const bucketName = config.supabase.bucket_name;
if (!pdfTable || !bucketName) {
  throw CustomError.internalError("Supabase pdf table or bucket is not defined");
}

const supabaseClient = new SupabaseClient(config.supabase.credentials).getClient();

class PdfWorker {
  constructor() {
    this.listenForMessages();
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
