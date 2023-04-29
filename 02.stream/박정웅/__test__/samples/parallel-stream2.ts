import { Transform, TransformCallback, TransformOptions } from 'stream';

export class ParallelStream2 extends Transform {
  private running: number = 0;
  private callback?: () => void;
  constructor(
    private readonly concurrency: number,
    private readonly userTransform: (
      chunk: any,
      encoding: BufferEncoding,
      push: (chunk: any, encoding?: BufferEncoding) => void,
      cd: (error?: any) => void
    ) => void,
    opts: TransformOptions
  ) {
    super({ objectMode: true, ...opts });
  }

  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    this.running++;
    this.userTransform(chunk, encoding, this.push.bind(this), this.onComplete.bind(this));
    callback();
  }

  _flush(callback: TransformCallback) {
    if (this.running > 0) {
      this.callback = callback;
    } else {
      callback();
    }
  }

  private onComplete(err?: Error) {
    this.running--;
    if (err) {
      return this.emit('error', err);
    }
    if (this.running === 0) {
      this.callback && this.callback();
    }
  }
}
