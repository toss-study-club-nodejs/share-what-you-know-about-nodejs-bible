import { ResponseSpec } from "../../../src/web-client/http/ResponseSpec";

class Body {
  foo: number;
  bar: string;
}

describe('ResponseSpec', () => {
  it('rawBody 를 가져온다', () => {
    const response = new ResponseSpec(200, 'body');

    expect(response.rawBody).toBe('body');
  });

  describe('toEntity', () => {
    it('json 형식의 응답값이 아니면 에러를 발생한다.', () => {
      const response = new ResponseSpec(200, 'invalid json');

      const result = () => response.toEntity(Body);

      expect(result).toThrow('Invalid JSON');
    });

    it('응답값을 인스턴스로 변환한다.', () => {
      const body = { foo: 123, bar: 'test' };
      const response = new ResponseSpec(200, JSON.stringify(body));

      const result = response.toEntity(Body);

      expect(result).toBeInstanceOf(Body);
      expect(result.foo).toBe(123);
      expect(result.bar).toBe('test');
    });
  });

  describe('toEntityList', () => {
    it('json array형식의 응답값이 아니면 에러를 발생한다.', () => {
      const body = { foo: 123, bar: 'test' };
      const response = new ResponseSpec(200, JSON.stringify(body));

      const result = () => response.toEntityList(Body);

      expect(result).toThrow('Invalid JSON');
    });

    it('응답값을 인스턴스로 변환한다.', () => {
      const body = [{ foo: 123, bar: 'test' }];
      const response = new ResponseSpec(200, JSON.stringify(body));

      const results = response.toEntityList(Body);

      expect(results).toHaveLength(1);
      expect(results[0]).toBeInstanceOf(Body);
      expect(results[0].foo).toBe(123);
      expect(results[0].bar).toBe('test');
    });
  });
});
