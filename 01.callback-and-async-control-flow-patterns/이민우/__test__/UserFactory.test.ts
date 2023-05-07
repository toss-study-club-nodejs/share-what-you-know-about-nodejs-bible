import { UserFactory } from "./UserFactory";

describe('UserFactory', () => {
  describe('findOneByCallback', () => {
    it('콜백함수에 대한 결과를 동기적으로 처리하지 않는다.',  () => {
      // given
      const userId = 1;
      const userFactory = new UserFactory(userId);

      // when
      const startTime = performance.now();
      userFactory.findOneByCallback(userId, () => {}, 1);

      // then
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThanOrEqual(1);
    })

    it('done 함수를 사용하여 콜백함수에 대한 처리를 한다.',  (done) => {
      // given
      const userId = 1;
      const userFactory = new UserFactory(userId);

      // when
      userFactory.findOneByCallback(userId, getCallback());

      // then
      function getCallback() {
        return (err: Error, user: any) => {

          expect(err).toBeNull();
          expect(user).toMatchInlineSnapshot(`
            {
              "id": 1,
              "name": "minwoo1",
            }
          `);
          done()
        };
      }
    })

    it('timeout 만큼 실행 대기한다.',  (done) => {
      // given
      const userId = 1;
      const userFactory = new UserFactory(userId);

      // when
      const startTime = performance.now();
      userFactory.findOneByCallback(userId, getCallback(), 1);

      // then
      function getCallback() {
        return (err: Error, user: any) => {
          const endTime = performance.now();

          expect(endTime - startTime).toBeGreaterThanOrEqual(1000);
          done()
        };
      }
    })

    it('유저가 존재하지 않을시 error 객체를 반환한다.', (done) => {
      // given
      const userFactory = new UserFactory(1);

      // when
      userFactory.findOneByCallback(-1, getCallback());

      // then
      function getCallback() {
        return (err: Error, user: any) => {
          expect(err).toBeInstanceOf(Error);
          expect(err.message).toBe('not found user');
          expect(user).toBeUndefined();
          done()
        };
      }
    });
  })

  describe('findOneByPromise', () => {
    it('than 메소드로 결과를 처리한다.',  async () => {
      // given
      const userId = 1;
      const userFactory = new UserFactory(userId);

      // when
      const result = userFactory.findOneByPromise(userId, 1);

      // then
      await result.then((user: any) => {
        expect(user).toMatchInlineSnapshot(`
          {
            "id": 1,
            "name": "minwoo1",
          }
        `);
      })
    });

    it('return Promise로 결과를 처리한다.',   () => {
      // given
      const userId = 1;
      const userFactory = new UserFactory(userId);

      // when
      const result = userFactory.findOneByPromise(userId, 1);

      // then
      return result.then((user: any) => {
        expect(user).toMatchInlineSnapshot(`
          {
            "id": 1,
            "name": "minwoo1",
          }
        `);
      })
    });

    it('catch 메소드로 에러를 처리한다.',  async () => {
      // given
      const userFactory = new UserFactory(1);

      // when
      const result = userFactory.findOneByPromise(-1, 1);

      // then
      await result.catch((error: Error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('not found user');
      })
    });

    it('resolves matcher를 통해 결과를 처리한다.',  async () => {
      // given
      const userId = 1;
      const userFactory = new UserFactory(userId);

      // when
      const promise = userFactory.findOneByPromise(userId, 1);

      // then
      await expect(promise).resolves.toMatchInlineSnapshot(`
        {
          "id": 1,
          "name": "minwoo1",
        }
      `);
    });

    it('rejects matcher를 통해 에러를 처리한다.',  async () => {
      // given
      const userFactory = new UserFactory(1);

      // when
      const promise = userFactory.findOneByPromise(-1, 1);

      // then
      await expect(promise).rejects.toThrow(new Error("not found user"))
    });

    it('try catch 통해 결과를 처리한다.',  async () => {
      // given
      const userFactory = new UserFactory(1);

      try {
        // when
        await userFactory.findOneByPromise(-1, 1);
      } catch (e: any) {
        // then
        expect(e).toBeInstanceOf(Error);
        expect(e.message).toBe('not found user');
      }
    });
  })
})
