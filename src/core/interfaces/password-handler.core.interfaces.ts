import type { comparePasswordFunction, HashFunction } from "../types/password-handler.types.js";

export interface IPasswordHandler {
  hash: HashFunction;
  compare: comparePasswordFunction;
}
