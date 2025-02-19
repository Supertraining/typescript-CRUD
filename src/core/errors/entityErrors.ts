import { IEntityErrors } from "../interfaces/iEntityErrors";

export const ENTITIES_ERRORS: IEntityErrors = Object.freeze({
  MISSING: (entity: string, property: string) => `Missing ${property}  at ${entity} entity`,
  MISSING_CREATED_AT: (entity: string) => `Missing createdAt at ${entity} entity`,
  MISSING_FULLNAME: (entity: string) => `Missing fullname at ${entity} entity`,
  MISSING_EMAIL: (entity: string) => `Missing email at ${entity} entity`,
  MISSING_PASSWORD: (entity: string) => `Missing password at ${entity} entity`,
  MISSING_ROLES: (entity: string) => `Missing roles at ${entity} entity`,
  MISSING_PDF: (entity: string) => `Missing pdf at ${entity} entity`,
});
