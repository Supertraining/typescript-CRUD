import pkg from "bcryptjs";
import type { IPasswordHandler } from "../interfaces/password-handler.core.interfaces.js";

const { hash, compare } = pkg;
export class PasswordHandler implements IPasswordHandler {
  async hash(password: string): Promise<string> {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
