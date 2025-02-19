import { DB_ERROR } from "../errors/DbErrors";
import { ICRUD, ICustomGet } from "../interfaces/iCrud";

export class GenericDatasourceImpl<T, U, V extends Partial<T>> implements ICRUD<T, U, V> {
  constructor(private readonly DB: any, private readonly table: string) {
    this.DB = DB;
    this.table = table;
  }
  async create(data: U): Promise<T> {
    const { error, data: registry } = await this.DB.from(this.table).insert(data).select().single();
    
    if (error) {
      throw DB_ERROR[error.code](error);
    }

    return registry as T;
  }

  async getAll(): Promise<T[]> {
    const { error, data } = await this.DB.from(this.table).select();

    if (error) {
      throw DB_ERROR[error.code](error);
    }
    return data as T[];
  }

  async getById(id: string): Promise<T> {
    const { error, data } = await this.DB.from(this.table).select().eq("id", id).single();

    if (error) {
      throw DB_ERROR[error.code](error);
    }

    return data as T;
  }

  async update(id: string, data: V): Promise<T> {
    const { error, data: updatedReg } = await this.DB.from(this.table)
      .update(data)
      .eq("id", id)
      .single();

    if (error) {
      throw DB_ERROR[error.code](error);
    }

    return updatedReg as T;
  }

  async delete(id: string): Promise<T> {
    const { error, data } = await this.DB.from(this.table).delete().eq("id", id).single();

    if (error) {
      throw DB_ERROR[error.code](error);
    }

    return data as T;
  }

  async customGet({ eqKey, eqValue, single }: ICustomGet): Promise<T[] | T> {
    if (single) {
      const { error, data } = await this.DB.from(this.table).select().eq(eqKey, eqValue).single();
      if (error) {
        throw DB_ERROR[error.code](error);
      }

      return data as T;
    }

    const { error, data } = await this.DB.from(this.table).select().eq(eqKey, eqValue);

    if (error) {
      throw DB_ERROR[error.code](error);
    }
    return data as T[];
  }
}
