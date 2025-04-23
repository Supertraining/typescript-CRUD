import { DB_ERROR } from "../errors/db-errors.core.errors.js";
import type { IBaseCrudExtended, ICustomGet } from "../interfaces/base-crud.core.interface.ts.js";

export class SupabaseDAO<T, U, V extends Partial<T>> implements IBaseCrudExtended<T, U, V> {
  constructor(private readonly DB: any, private readonly table: string) {
    this.DB = DB;
    this.table = table;
  }
  async create(data: U): Promise<T> {
    const { error, data: registry } = await this.DB.from(this.table).insert(data).select().single();

    if (error) {
      if (error.code in DB_ERROR) {
        throw (
          DB_ERROR[error.code]!(error) ||
          (() => {
            throw new Error("Unknown error");
          })()
        );
      }
    }

    return registry as T;
  }

  async getAll(): Promise<T[]> {
    const { error, data } = await this.DB.from(this.table).select();

    if (error) {
      if (error.code in DB_ERROR) {
        throw (
          DB_ERROR[error.code]!(error) ||
          (() => {
            throw new Error("Unknown error");
          })()
        );
      }
    }
    return data as T[];
  }

  async getById(id: string): Promise<T> {
    const { error, data } = await this.DB.from(this.table).select().eq("id", id).single();

    if (error) {
      if (error.code in DB_ERROR) {
        throw (
          DB_ERROR[error.code]!(error) ||
          (() => {
            throw new Error("Unknown error");
          })()
        );
      }
    }

    return data as T;
  }

  async update(id: string, data: V): Promise<T> {
    const { error, data: updatedReg } = await this.DB.from(this.table)
      .update(data)
      .eq("id", id)
      .single();

    if (error) {
      if (error.code in DB_ERROR) {
        throw (
          DB_ERROR[error.code]!(error) ||
          (() => {
            throw new Error("Unknown error");
          })()
        );
      }
    }

    return updatedReg as T;
  }

  async delete(id: string): Promise<T> {
    const { error, data } = await this.DB.from(this.table).delete().eq("id", id).single();

    if (error) {
      if (error.code in DB_ERROR) {
        throw (
          DB_ERROR[error.code]!(error) ||
          (() => {
            throw new Error("Unknown error");
          })()
        );
      }
    }

    return data as T;
  }

  async customGet({ eqKey, eqValue, single }: ICustomGet): Promise<T[] | T> {
    if (single) {
      const { error, data } = await this.DB.from(this.table).select().eq(eqKey, eqValue).single();
      if (error) {
        if (error.code in DB_ERROR) {
          DB_ERROR[error.code] ||
            (() => {
              throw new Error("Unknown error");
            })();
        }
      }

      return data as T;
    }

    const { error, data } = await this.DB.from(this.table).select().eq(eqKey, eqValue);

    if (error) {
      if (error.code in DB_ERROR) {
        throw (
          DB_ERROR[error.code]!(error) ||
          (() => {
            throw new Error("Unknown error");
          })()
        );
      }
    }
    return data as T[];
  }
}
