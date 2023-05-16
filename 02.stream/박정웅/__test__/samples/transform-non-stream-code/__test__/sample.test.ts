import { asyncFunctionToStream, asyncFunctionToStream2, asyncFunctionToStream3 } from '../sample';

describe('sample.test', () => {
  it('asyncFunctionToStream', async () => {
    const mock = jest.fn().mockResolvedValue('1');
    const stream = asyncFunctionToStream(mock);
    expect(mock).not.toBeCalled(); //스트림을 생성하는 순간에 원본 함수가 실행되지 않아야함

    const data = await new Promise<string>(resolve => {
      stream.on('data', resolve);
    });
    expect(data).toBe('1');
    expect(mock).toBeCalledTimes(1);
  });

  it('asyncFunctionToStream2', async () => {
    const mock = jest.fn().mockResolvedValue('1');
    const stream = asyncFunctionToStream2(mock);
    expect(mock).not.toBeCalled();

    const data = await new Promise<string>(resolve => {
      stream.on('data', resolve);
    });
    expect(data).toBe('1');
    expect(mock).toBeCalledTimes(1);
  });

  it('asyncFunctionToStream3', async () => {
    const mock = {
      getData: jest.fn().mockResolvedValue('1'),
    };
    const stream = asyncFunctionToStream3([mock]);
    expect(mock.getData).not.toBeCalled();

    const data = await new Promise<string>(resolve => {
      stream.on('data', resolve);
    });
    expect(data).toBe('1');
    expect(mock.getData).toBeCalledTimes(1);
  });
});
