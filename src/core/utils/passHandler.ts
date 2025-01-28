import {hash, compare} from "bcryptjs";

export class PasswordHandler {
    static async hash(password: string): Promise<string> {
        const salt = await hash(password, 10);
        return salt;
    }

    static async compare(password: string, hash: string): Promise<boolean> {
        return await compare(password, hash);
    }
}