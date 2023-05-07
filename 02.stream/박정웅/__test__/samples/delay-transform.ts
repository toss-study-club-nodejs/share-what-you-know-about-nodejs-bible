import { Transform, TransformCallback } from 'stream';

export class DelayTransform extends Transform {
  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    setTimeout(() => {
      this.push(chunk);
      callback(); //을 호출해야 다음 데이터를 읽어오네
    }, 1000);
  }
}
