import { validateEnvVariables } from "../core/utils/validateEnsVariables";

const nodeEnv = process.env.NODE_ENV;

nodeEnv?.trim() === "dev" && process.loadEnvFile();

const {
  MY_APP_SUPABASE_URL,
  MY_APP_SUPABASE_SECRET_API_KEY,
  MY_APP_SUPABASE_USERS_TABLE,
  MY_APP_SUPABASE_PDF_TABLE,
  MY_APP_SUPABASE_BUCKET_NAME,
  MY_APP_JWT_SECRET,
  MY_APP_API_KEY,
  MY_APP_REDIS_USERNAME,
  MY_APP_REDIS_PASSWORD,
  MY_APP_REDIS_HOST,
  MY_APP_REDIS_PORT,
} = process.env;

const envArray: [string, string | undefined][] = Object.entries(process.env).filter(
  ([key, value]) => key.startsWith("MY_APP_")
);

validateEnvVariables(envArray);

export const config: {
  supabase: {
    credentials: {
      url: string;
      secret_api_key: string;
    };
    users_table: string;
    pdf_table: string;
    bucket_name: string;
  };
  jwt_secret: string;
  api_key: string;
  redis: {
    username: string;
    password: string;
    host: string;
    port: string;
  };
} = {
  supabase: {
    credentials: {
      url: MY_APP_SUPABASE_URL as string,
      secret_api_key: MY_APP_SUPABASE_SECRET_API_KEY as string,
    },
    users_table: MY_APP_SUPABASE_USERS_TABLE as string,
    pdf_table: MY_APP_SUPABASE_PDF_TABLE as string,
    bucket_name: MY_APP_SUPABASE_BUCKET_NAME as string,
  },
  jwt_secret: MY_APP_JWT_SECRET as string,
  api_key: MY_APP_API_KEY as string,
  redis: {
    username: MY_APP_REDIS_USERNAME as string,
    password: MY_APP_REDIS_PASSWORD as string,
    host: MY_APP_REDIS_HOST as string,
    port: MY_APP_REDIS_PORT as string,
  },
};
