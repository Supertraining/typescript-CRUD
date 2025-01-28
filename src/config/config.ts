import { ERROR_MESSAGE } from "../constants/ERROR_MESSGS";
import { CustomError } from "../core/errors/customError";
import { validateEnvVariables } from "../core/utils/validateEnsVariables";

const nodeEnv = process.env.NODE_ENV;

nodeEnv?.trim() === "dev" && process.loadEnvFile();

const {
  MY_APP_SUPABASE_URL,
  MY_APP_SUPABASE_SECRET_API_KEY,
  MY_APP_SUPABASE_USERS_TABLE,
  MY_APP_JWT_SECRET,
  MY_APP_API_KEY,
} = process.env;

const envArray: [string, string | undefined][] = Object.entries(process.env).filter(
  ([key, value]) => key.startsWith("MY_APP_")
);

validateEnvVariables(envArray);

export const config: {
  supabase_url: string;
  supabase_secret_api_key: string;
  supabase_users_table: string;
  jwt_secret: string;
  api_key: string;
} = {
  supabase_url: MY_APP_SUPABASE_URL as string,
  supabase_secret_api_key: MY_APP_SUPABASE_SECRET_API_KEY as string,
  supabase_users_table: MY_APP_SUPABASE_USERS_TABLE as string,
  jwt_secret: MY_APP_JWT_SECRET as string,
  api_key: MY_APP_API_KEY as string,
};
