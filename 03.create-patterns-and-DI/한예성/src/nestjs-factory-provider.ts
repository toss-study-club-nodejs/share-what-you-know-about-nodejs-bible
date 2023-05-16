/*
https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory
nestjs에서 요청에 파라이터 따라 프로바이더를 동적으로 생성하고 싶은 이슈가 있었는데 그때 REQUEST 프로바이더 스코프와 useFactory와 를 사용했습니다.
그런데 REQUEST 프로바이더 스코프의 경우 요청에 따라
*/

type Constructor = new (...args: any[]) => any;

function Singleton<T extends Constructor>(Base: T): T {
  let instance: InstanceType<T>;
  return class {
    constructor(...args: any) {
      if(!!instance) {
        return instance;
      }
      instance = new Base(...args)
      return instance;
    }
  } as T;
}

@Singleton
export class Logger {
  constructor() {}

  public info(message: string): void {
    console.log(`[info] ${message}`);
  }

  public warn(message: string): void {
    console.log(`[warn] ${message}`);
  }
}