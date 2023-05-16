import { Transform } from 'stream';

export class Throttle extends Transform {
  private delay: number;
  private lastPushTime: number;

  constructor(options?: any) {
    super(options);
    this.delay = options?.delay ?? 1000;
    this.lastPushTime = Date.now();
  }

  _transform(chunk: any, encoding: string, callback: Function) {
    const now = Date.now();
    const timeElapsed = now - this.lastPushTime;
    if (timeElapsed >= this.delay) {
      this.push(chunk);
      this.lastPushTime = now;
    }
    callback();
  }
}
