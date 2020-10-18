export interface Data {
  data: Array<string[] | number[]>;
  meta: MetaData;
}

export interface MetaData {
  total: Record<string, number>;
  columns: unknown;
}
