import { Logger } from "../src/singleton-decorator-with-closure";

describe('싱글톤 데코레이터 테스트', () => {
  test('생성된 객체가 같은지', async () => {
    const testLogger1: Logger = new Logger();
    const testLogger2: Logger = new Logger();

    expect(testLogger1).toEqual(testLogger2);
  });
});
