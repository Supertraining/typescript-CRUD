export interface IEntityErrors {
   [key: string]: (entity: string, property: string)=> string;
}