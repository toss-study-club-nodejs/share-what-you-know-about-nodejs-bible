import { LongPollingSample } from '../sample';
import { Writable } from 'stream';

describe('sample.test', () => {
  it('should ', async () => {
    const mock = jest
      .fn()
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null)
      .mockResolvedValue('1');

    const service = new LongPollingSample(mock);

    const data = await service.getLongPollingData();
    expect(data).toMatchInlineSnapshot(`""`);
  });

  it('stream ver', done => {
    const response = new Writable({
      objectMode: true,
      write(chunk: any) {
        expect(chunk).toBe('1');
        done();
      },
    });
    const mock = jest.fn().mockResolvedValueOnce(null).mockResolvedValue('1');
    const stream = new LongPollingSample(mock).getLongPollingData2();
    stream.pipe(response);
  });
});
