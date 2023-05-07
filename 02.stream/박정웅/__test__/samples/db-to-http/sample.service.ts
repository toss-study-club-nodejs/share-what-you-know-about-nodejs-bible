import { DataSourceService } from './data-source.service';
import { Readable, Writable } from 'stream';
import { TransformDataToCsv } from './transform-data-to-csv';

export class SampleService {
  constructor(private readonly dataSourceService: DataSourceService = new DataSourceService()) {}

  async getData(writeStream: Writable) {
    this.from(this.dataSourceService.getData()).pipe(writeStream);
  }

  private from(source: Iterable<any>) {
    return Readable.from(source).pipe(new TransformDataToCsv());
  }
}
