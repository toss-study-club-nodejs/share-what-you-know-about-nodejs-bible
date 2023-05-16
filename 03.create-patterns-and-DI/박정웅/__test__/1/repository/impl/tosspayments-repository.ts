import { DataRepository } from '../data-repository';
import { Data } from '../../data-client/data-client';

export class TosspaymentsRepository implements DataRepository {
  async save(data: Data[]): Promise<void> {
    console.log(`call save ${this.constructor.name}, ${data.length}`);
  }
}
