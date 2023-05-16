/*
Singleton 특성을 갖는 객체를 만드는 부분을 분리해서 싱글톤 만드는 코드를 재사용 해서 만들수 있는 방법이 있을까요?
아래와 같이 클로져와 Class 데코레이터를 활용해 사용하는 경우를 봤는데 이 방식은 new 키워드를 막는 방식이 아니라서
사용하는 입장에서 혼돈을 줄수 있을 것 같다는 생각이 듭니다.

TS에서 new 키워드를 사용하지 못하도록 막으면서, 재사용 가능한 기능으로 분리 할수있는 방법이 있을까요?
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