import { createReadStream, createWriteStream } from 'fs';
import { Readable, Transform } from 'stream';

export function concatFiles(dest: string, files: string[]) {
  return new Promise<void>((resolve, reject) => {
    const destStream = createWriteStream(dest);
    //순차 스트림을 만들어낸다.
    Readable.from(files)
      .pipe(
        new Transform({
          objectMode: true,
          transform: (fileName, enc, done) => {
            const src = createReadStream(fileName);
            src.pipe(destStream, { end: false });
            src.on('error', done);
            src.on('end', done);
          },
        })
      )
      .on('error', reject)
      .on('finish', () => {
        destStream.end();
        resolve();
      });
  });
}
