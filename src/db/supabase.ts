import { createClient } from "@supabase/supabase-js";
import { config } from "../config/config";

if (!config.supabase_url || !config.supabase_secret_api_key) {
  throw new Error("Supabase URL or Supabase Secret is not configured");
}
export const supabase = createClient(config.supabase_url, config.supabase_secret_api_key); 
