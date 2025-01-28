import { styleText } from "util";

export class CustomLog {
  static info(message: string) {
    console.log(`${this.timestamp()} ${styleText("green", message)}`);
  }

  static error(message: string) {
    console.log(`${this.timestamp()} ${styleText("red", message)}`);
  }

  static warn(message: string) {
    console.log(`${this.timestamp()} ${styleText("yellow", message)}`);
  }

  static timestamp(): string {
    return `[${new Date().toISOString()}]`;
  }
}


