import { PassThrough, pipeline, Readable, Transform, TransformCallback } from 'stream';
import { promisify } from 'util';

export class FooRepository {
  private readonly storage: any[] = [];

  save(item: any) {
    this.storage.push(item);
  }

  findAll() {
    return this.storage;
  }
}

export interface DataSources {
  getData(): Promise<string>;
}

export class FooService {
  constructor(private readonly repository: FooRepository, private readonly dataSources: DataSources[]) {}

  //스트림 방식
  async collectData() {
    //데이터 저장 하는 부분을 추상화 가능함
    const stream = new PassThrough({ objectMode: true });
    stream.on('data', data => {
      this.repository.save(data);
    });

    await promisify(pipeline)(Readable.from(this.dataSources), this.dataSourceToStream(), stream);
  }

  private dataSourceToStream() {
    return new Transform({
      objectMode: true,
      transform(chunk: DataSources, encoding: BufferEncoding, callback: TransformCallback) {
        chunk
          .getData()
          .then(data => {
            callback(null, data);
          })
          .catch(callback);
      },
    });
  }

  //하던 방식
  // async collectData() {
  //   for (const dataSource of this.dataSources) {
  //     const data = await dataSource.getData();
  //     await this.repository.save(data);
  //   }
  // }
}
