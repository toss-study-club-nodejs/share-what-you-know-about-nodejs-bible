export interface DataClient {
  request(): Promise<Data[]>;
}

export type Data = { id: string; account: string };
