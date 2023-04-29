import { SimpleTransformStream } from './samples/transform-stream';
import { pipeline, Readable } from 'stream';
import { promisify } from 'util';

describe('sample.test', () => {
  it('simple transform', async () => {
    const stdoutStream = process.stdout;
    const transformStream = new SimpleTransformStream();
    await promisify(pipeline)(Readable.from(['a', 'b', 'c']), transformStream, stdoutStream);
    console.log('1');
  });
});
