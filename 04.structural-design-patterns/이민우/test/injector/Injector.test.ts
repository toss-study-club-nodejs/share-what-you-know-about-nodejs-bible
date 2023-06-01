import {Injectable, Injector} from "../../src/injector/Injector";

describe('Injector', () => {

  it('생성자를 통해 의존성 주입되는 인스턴스를 반환한다.', function () {
    @Injectable()
    class UserRepository {
      methodA() {
        return 'UserRepository methodA'
      }
    }

    @Injectable()
    class UserService {
      constructor(private readonly userRepository: UserRepository) {
      }

      methodB() {
        return this.userRepository.methodA();
      }
    }


    // const result = new UserService(new UserRepository());
    const result = Injector.resolve(UserService);


    expect(result).toBeInstanceOf(UserService);
    expect(result.methodB()).toBe('UserRepository methodA');
  });
})
