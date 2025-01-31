import { createClient } from "@supabase/supabase-js";

interface ISupabaseClient {
  secret_api_key: string;
  url: string;
}

export class SupabaseClient {
  private readonly secretKey: string;
  private readonly url: string;
  private readonly client = createClient;

  constructor(options: ISupabaseClient) {
    const { secret_api_key, url } = options;
    this.secretKey = secret_api_key;
    this.url = url;
  }

   public getClient() {
    const supabaseClient = this.client(this.url, this.secretKey);
    return supabaseClient;
  }
}
