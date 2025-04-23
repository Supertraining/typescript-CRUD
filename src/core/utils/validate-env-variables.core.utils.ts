import { ERROR_MESSAGE } from "../constants/ERROR_MESGS.constants.js";
import { CustomError } from "../errors/custom-error.core.erros.js";

export function validateEnvVariables(envs: [string, string | undefined][]) {
  for (const [key, value] of envs) {
    if (
      !value ||
      value === undefined ||
      value === null ||
      value === "" ||
      typeof value !== "string" ||
      typeof value === "undefined"
    ) {
      throw CustomError.internalError(`${ERROR_MESSAGE.ENV_VARIABLES_NOT_CONFIGURED} - ${key}`);
    }
  }
}
