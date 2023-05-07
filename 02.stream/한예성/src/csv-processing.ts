import { parse, Parser } from 'csv-parse';
import { Transform, TransformOptions, TransformCallback } from 'stream';

export const csvParser: Parser = parse({ columns: true });

export const csvParserPromise = (file: Buffer | string): Promise<any[]> =>
  new Promise((resolve, reject) => {
    parse(file, { columns: true }, (error, data) => {
      if (error) reject(error);

      resolve(data);
    });
  });

export class FilterByCost extends Transform {
  private readonly minCost: number;

  constructor(minCost: number, options: TransformOptions = {}) {
    options.objectMode = true;
    super(options);
    this.minCost = minCost;
  }

  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback,
  ) {
    try {
      if (parseFloat(chunk['total cost']) >= this.minCost) {
        this.push(chunk);
      }
      callback();
    } catch (error) {
      throw error;
    }
  }
}

export class CostMonitor extends Transform {
  private totalCost: number;
  private totalRows: number;

  constructor(options: TransformOptions = {}) {
    options.objectMode = true;
    super(options);

    this.totalCost = 0;
    this.totalRows = 0;
  }

  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback,
  ) {
    this.totalCost += parseFloat(chunk['total cost']);
    this.totalRows += 1;
    this.push(chunk);
    callback();
  }

  getResult(): { totalCost: number; totalRows: number } {
    return {
      totalCost: this.totalCost,
      totalRows: this.totalRows,
    };
  }
}

export class CostMonitorWithError extends Transform {
  private totalCost: number;
  private totalRows: number;

  constructor(options: TransformOptions = {}) {
    options.objectMode = true;
    super(options);

    this.totalCost = 0;
    this.totalRows = 0;
  }

  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback,
  ) {
    try {
      this.totalCost += parseFloat(chunk['total cost']);
      this.totalRows += 1;
      console.log(this.totalRows);
      if (this.totalRows > 100) {
        throw new Error('테스트 에러 메시지');
      }
      this.push(chunk);
      callback();
    } catch (err) {
      this.emit('error', err);
    }
  }

  getResult(): { totalCost: number; totalRows: number } {
    return {
      totalCost: this.totalCost,
      totalRows: this.totalRows,
    };
  }
}
