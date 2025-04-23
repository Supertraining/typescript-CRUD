export const DATA_VALIDATION_ERRORS = Object.freeze({
  REQUIRED_FIELD: "Required field is missing",
  INVALID_NAME: "Name is not valid",
  INVALID_EMAIL: "Email is not valid",
  INVALID_PASSWORD:
    "Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
  INVALID_IMAGE_NAME: "Image name is not valid",
  INVALID_ROLE: "Role is not valid",
  INVALID_ROLE_FORMAT: "Role format is not valid",
  NO_DATA_PROVIDED: "No data provided",
  REGISTRY_NOT_FOUND: "Registry not found",
  FIELDS_NOT_ALLOWED: (fields: string) => `The following fields are not allowed: ${fields}`,
});

export const DB_ERRORS = Object.freeze({
  REGISTRY_NOT_FOUND: "Registry not found",
  REQUIRED_FIELD: "Required field is missing",
  TABLE_NOT_DEFINED: (tableName: string) =>
    `Supabase table or bucket '${tableName}' is not defined`,
});

export const ERROR_MESSAGE = Object.freeze({
  INTERNAL_ERROR: "Internal error",
  JWT_SECRET_NOT_DEFINED: "JWT secret is not defined",
  USER_NOT_FOUND: "User not found",
  INVALID_PASSWORD: "Invalid password",
  ERROR_GENERATING_TOKEN: "Error generating token",
  TOKEN_NOT_FOUND: "Token not found",
  INVALID_TOKEN: "Invalid token",
  INVALID_TOKEN_USER_NOT_FOUND: "Invalid token - user not found",
  ENV_VARIABLES_NOT_CONFIGURED: "Environment variables not configured",
  ACCESS_DENIED: "Access denied",
  API_KEY_NOT_FOUND: "API key not found",
  INVALID_API_KEY: "Invalid API key",
  MULTIPLE_USERS_FOUND: "Unexpected multiple users found",
  MULTIPLE_PDFS_FOUND: "Unexpected multiple pdfs found",
  SINGLE_USER_FOUND: "Unexpected single user found",
  SINGLE_PDF_FOUND: "Unexpected single pdf found",
  CACHE_HANDLER_NOT_DEFINED: (functionName: string) =>
    `Cache handler is not defined on ${functionName}`,
  WORKER_POOL_NOT_DEFINED: (functionName: string) =>
    `Worker pool is not defined on ${functionName}`,
  HASH_PASSWORD_FUNCTION_NOT_DEFINED: (functionName: string) =>
    `Hash password function is not defined on ${functionName}`,
});
