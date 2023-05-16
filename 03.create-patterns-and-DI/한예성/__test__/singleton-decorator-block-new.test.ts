import { SingletonLogger, Logger } from "../src/singleton-decorator-block-new";

describe('싱글톤 클래스 mixin 테스트', () => {
  test('생성된 객체가 같은지', async () => {
    const testLogger1: Logger = SingletonLogger.getInstance();
    const testLogger2: Logger = SingletonLogger.getInstance();

    // const testLogger3: Logger = new SingletonLogger(); // 싱글톤 객체 일 경우 new로 생성시 경고 표시
    const testLogger4: Logger = new Logger();

    expect(testLogger1 === testLogger2).toEqual(true);
    expect(testLogger1 === testLogger4).toEqual(false);
  });
});
