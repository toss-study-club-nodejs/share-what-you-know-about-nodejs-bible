import { Readable, Transform, TransformCallback } from 'stream';

/**
 * 값을 반환하는 함수를 stream으로 작성하는 패턴
 *
 * 1. Readable 인스턴스를 직접 생성.
 *
 * 2. Readable.from 함수를 활용.
 *
 * 3. Transform 스트림을 활용.
 */

//Readable 인스턴스를 직접 생성.
export function asyncFunctionToStream(fn: () => Promise<any>): Readable {
  return new Readable({
    objectMode: true,
    read() {
      fn()
        .then(data => {
          this.push(data);
          this.push(null);
        })
        .catch(err => {
          this.emit('error', err);
        });
    },
  });
}

//Readable.from 함수를 활용.
export function asyncFunctionToStream2(fn: () => Promise<any>): Readable {
  return Readable.from(
    (async function* () {
      yield await fn();
    })(),
    { objectMode: true }
  );
}

//Transform 스트림을 활용.
export function asyncFunctionToStream3(fn: { getData: () => Promise<any> }[]) {
  return Readable.from(fn).pipe(
    new Transform({
      objectMode: true,
      transform(chunk: { getData: () => Promise<any> }, encoding: BufferEncoding, callback: TransformCallback) {
        chunk
          .getData()
          .then(data => {
            callback(null, data);
          })
          .catch(callback);
      },
    })
  );
}
