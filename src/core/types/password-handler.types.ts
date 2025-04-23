export type HashFunction = (password: string) => Promise<string>;
export type comparePasswordFunction = (password: string, hash: string) => Promise<boolean>;
