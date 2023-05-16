import { Data } from '../data-client/data-client';

export interface DataRepository {
  save(data: Data[]): Promise<void>;
}
