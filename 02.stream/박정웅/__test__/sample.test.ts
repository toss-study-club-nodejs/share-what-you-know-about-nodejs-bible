import { SimpleTransformStream } from './samples/transform-stream';
import { pipeline, Readable } from 'stream';
import { promisify } from 'util';
import { ChunkTransform } from './samples/chunk-transform';
import { Throttle } from './samples/throttle';
import { DelayTransform } from './samples/delay-transform';

jest.setTimeout(5000);
describe('sample.test', () => {
  it('simple transform', async () => {
    const stdoutStream = process.stdout;
    const transformStream = new SimpleTransformStream();
    await promisify(pipeline)(Readable.from(['a', 'b', 'c']), transformStream, stdoutStream);
    console.log('1');
  });

  it('transform chunk test', async () => {
    await promisify(pipeline)(Readable.from(['1', '2', '3', '4']), new ChunkTransform(), process.stdout);
  });

  it('throttle test', async () => {
    // Usage:
    const throttle = new Throttle({ delay: 1000 });

    // Pipe the data through the throttle stream
    await promisify(pipeline)(Readable.from(['1', '2', '3', '4']), throttle, process.stdout);
  });

  it('delay test', async () => {
    const throttle = new DelayTransform();
    await promisify(pipeline)(Readable.from(['1', '2', '3', '4']), throttle, process.stdout);
  });

  it('stream to iterable', async () => {
    const readStream = Readable.from(['1', '2', '3', '4']);
    for await (const chunk of readStream) {
      console.log(chunk);
    }

    for await (const chunk of readStream) {
      console.log(chunk);
    }
  });
});
