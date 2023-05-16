import { Data, DataClient } from '../data-client';

export class TosspaymentsDataClient implements DataClient {
  async request(): Promise<Data[]> {
    return [];
  }
}
