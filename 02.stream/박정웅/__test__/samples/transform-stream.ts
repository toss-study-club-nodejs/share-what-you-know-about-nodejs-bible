import { Transform, TransformCallback } from 'stream';

export class SimpleTransformStream extends Transform {
  private temp: any[] = [];
  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    this.temp.push(chunk);
    if (this.temp.length > 2) {
      this.push(`${this.temp.join(',')}\n`);
      this.temp = [];
    }
    if (chunk.toString() === 'd') {
      callback(new Error('data is d'), chunk);
    } else {
      callback();
    }
  }
  _flush(callback: TransformCallback) {
    this.push(`${this.temp.join(',')}`);
    callback();
  }
}
