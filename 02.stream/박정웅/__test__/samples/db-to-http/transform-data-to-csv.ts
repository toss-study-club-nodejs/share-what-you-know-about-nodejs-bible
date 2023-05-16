import { Transform, TransformCallback } from 'stream';

export class TransformDataToCsv extends Transform {
  constructor() {
    super({ objectMode: true });
    this.push(`id,data\n`);
  }

  _transform(chunk: { id: string; data: string }, encoding: BufferEncoding, callback: TransformCallback) {
    this.push(`${chunk.id},${chunk.data}\n`);
    callback();
  }

  _flush(callback: TransformCallback) {
    callback();
  }
}
