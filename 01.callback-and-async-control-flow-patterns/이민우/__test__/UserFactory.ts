type User = { id: number, name: string };
export class UserFactory {
  readonly #users: Array<User> = [];


  constructor(id: number, name?: string) {
    this.#users.push({ id, name: name ?? `minwoo${id}`});
  }


  findOneByCallback(id: number, callback: Function, sec: number = 0): void {
    const user = this.#findUser(id);

    setTimeout(() => {
      if (!user) {
        return callback(new Error('not found user'));
      }

      callback(null, { id, name: `${user.name}`});
    }, sec * 1000);
  }

  findOneByPromise(id: number, sec: number = 0): Promise<User> {
    const user = this.#findUser(id);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!user) {
          return reject(new Error('not found user'));
        }

        resolve({ id, name: `${user.name}`});
      }, sec * 1000);
    })
  }

  #findUser(id: number): User | undefined {
    return this.#users.find(user => user.id === id);
  }
}
