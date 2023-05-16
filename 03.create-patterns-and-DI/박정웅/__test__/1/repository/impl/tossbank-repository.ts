import { DataRepository } from '../data-repository';
import { Data } from '../../data-client/data-client';

export class TossbankRepository implements DataRepository {
  async save(data: Data[]): Promise<void> {
    console.log(`call save ${this.constructor.name}, ${data.length}`);
  }
}
