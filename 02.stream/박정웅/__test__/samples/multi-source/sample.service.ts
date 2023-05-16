import { Readable } from 'stream';

export class SampleService {
  //여러 카드사의 데이터를 받아서 데이터베이스에 적재하는 서비스
  async execute(dataSources: Readable[]) {
    return Readable.from(dataSources).pipe(process.stdout);
  }
}
