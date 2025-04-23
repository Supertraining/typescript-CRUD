import { config } from "../../config/config.js";
import { DB_ERRORS } from "../constants/ERROR_MESGS.constants.js";
import { CustomError } from "../errors/custom-error.core.erros.js";

export function getDbTable({
  table_name,
  bucket_name,
}: {
  table_name?: string;
  bucket_name?: string;
}) {
  const table = table_name
    ? config.supabase.tables[table_name]
    : bucket_name
    ? config.supabase.buckets[bucket_name]
    : undefined;

  if (!table) {
    throw CustomError.internalError(DB_ERRORS.TABLE_NOT_DEFINED(table_name || bucket_name || ""));
  }
  return table;
}
