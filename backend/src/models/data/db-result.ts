import { FieldInfo } from 'mysql';

export interface DbResult {
  results: Array<FieldInfo>;
  fields: FieldInfo[] | undefined;
}
