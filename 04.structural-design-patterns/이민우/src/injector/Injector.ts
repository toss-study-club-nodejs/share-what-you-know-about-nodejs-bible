import 'reflect-metadata';

type Type<T = any> = new (...args: any[]) => T;


export function Injectable() {
  return function (target: any) {
  };
}


export class Injector {
  private static container = new Map<string, any>();

  static resolve<T>(target: Type<T>): T {
    if (Injector.container.has(target.name)) {
      return Injector.container.get(target.name);
    }

    const paramTypes: Type[] = Reflect.getMetadata("design:paramtypes", target) || [];

    const injections = paramTypes.map((token: Type<any>) =>
      Injector.resolve(token)
    );

    const instance = new target(...injections);
    Injector.container.set(target.name, instance);
    return instance;
  }
}
