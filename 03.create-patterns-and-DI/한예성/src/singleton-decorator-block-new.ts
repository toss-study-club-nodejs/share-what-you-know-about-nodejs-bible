type Constructor = new (...args: any[]) => any;
type Singleton<T extends Constructor> = { getInstance(): InstanceType<T>};

function AsSingleton<T extends Constructor>(Base: T): Singleton<T> {
  return class {
    private constructor() {}

    static #instance: InstanceType<T>;
    public static getInstance(): InstanceType<T> {
      if (!this.#instance) {
        this.#instance = new Base();
      }
      return this.#instance
    }
  }
}

export class Logger {
  public info(message: string): void {
    console.log(`[info] ${message}`);
  }

  public warn(message: string): void {
    console.log(`[warn] ${message}`);
  }
}

export const SingletonLogger = AsSingleton(Logger);