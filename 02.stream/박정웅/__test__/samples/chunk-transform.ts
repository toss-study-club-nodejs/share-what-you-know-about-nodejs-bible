import { Transform, TransformCallback } from 'stream';

export class ChunkTransform extends Transform {
  private count = 0;

  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    this.count++;
    if (this.count === 2) {
      this.push(chunk);
      this.count = 0;
    }
    callback();
  }
}
