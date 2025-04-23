export const RESPONSE_MSG = Object.freeze({
    USER_CREATED: "User created",
    USER_UPDATED: "User updated",
    USER_DELETED: "User deleted",
    USER_NOT_FOUND: "User not found",
    REGISTRY_NOT_FOUND: "Registry not found",
    FIELDS_NOT_ALLOWED: (fields: string) => `The following fields are not allowed: ${fields}`,
});