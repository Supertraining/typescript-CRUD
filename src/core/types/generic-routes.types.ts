export type Method = "get" | "post" | "put" | "delete";

export type ExtensibleController = "getAll" | "getById" | "create" | "update" | "delete" | (string & {});
