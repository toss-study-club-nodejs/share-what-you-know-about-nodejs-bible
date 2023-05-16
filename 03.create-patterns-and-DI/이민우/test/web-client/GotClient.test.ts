import { GotClient } from "../../src/web-client/GotClient";
import { MediaType } from "../../src/web-client/http/MediaType";
import { BodyInserter } from "../../src/web-client/http/BodyInserter";
import nock from "nock";

describe('GotClient', () => {
  beforeAll(() => nock.cleanAll());

  describe('url', () => {
    it('url 을 설정한다', async () => {
      // given
      const url = 'http://localhost:4321';
      nock(url).get('/').reply(200, 'body');
      const client = new GotClient();

      // when
      const response = await client.url(url).retrieve();

      // then
      expect(response.statusCode).toBe(200);
      expect(response.rawBody).toBe('body');
    });

    it('인스턴스 초기화했을때 url을 설정할수 있다.', async () => {
      // given
      const url = 'http://localhost:4321';
      nock(url).get('/').reply(200, 'body');
      const client = new GotClient(url);

      // when
      const response = await client.retrieve();

      // then
      expect(response.statusCode).toBe(200);
      expect(response.rawBody).toBe('body');
    });

    it('url 메소드로 설정을 오버라이딩할수 있다.', async () => {
      // given
      const url = 'http://localhost:4321';
      nock(url).get('/').reply(200, 'body');
      const client = new GotClient('invalid url');

      // when
      const response = await client.url(url).retrieve();

      // then
      expect(response.statusCode).toBe(200);
      expect(response.rawBody).toBe('body');
    });
  });

  it.each(['get', 'post', 'put', 'patch', 'delete'] as const)(
    '%s 메소드로 데이터를 조회할 수 있다.',
    async (httpMethod) => {
      // given
      const url = 'http://localhost:4321';
      nock(url).intercept('/', httpMethod).reply(200, 'body');
      const client = new GotClient(url);

      // when
      const response = await client[httpMethod]().retrieve();

      // then
      expect(response.statusCode).toBe(200);
      expect(response.rawBody).toBe('body');
    },
  );

  it('accept 메소드로 content-type을 설정할수 있다.', async () => {
    // given
    const url = 'http://localhost:4321';
    nock(url)
      .get('/')
      .matchHeader('Content-Type', 'application/json')
      .reply(200, 'body');
    const client = new GotClient(url);

    // when
    const response = await client.accept(MediaType.APPLICATION_JSON).retrieve();

    // then
    expect(response.statusCode).toBe(200);
    expect(response.rawBody).toBe('body');
  });

  it('timeout만큼 설정된 시간이 초과된경우 에러를 발생한다.', async () => {
    // given
    const url = 'http://localhost:4321';
    nock(url).get('/').delay(1000).reply(200, 'body');
    const client = new GotClient(url);

    // when
    const exchange = async () => await client.timeout(500).retrieve();

    // then
    await expect(exchange).rejects.toThrow();
  }, 2000);

  it('400 statusCode를 받으면 에러를 발생한다.', async () => {
    // given
    const url = 'http://localhost:4321';
    nock(url).get('/').replyWithError({
      message: 'Bad Request',
      code: 400,
    });
    const client = new GotClient(url);

    // when
    const response = async () => await client.retrieve();

    // then
    await expect(response).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Bad Request"`,
    );
  });

  it('500 statusCode를 받으면 에러를 발생한다.', async () => {
    // given
    const url = 'http://localhost:4321';
    nock(url).get('/').replyWithError({
      message: 'Internal Server Error',
      code: 500,
    });
    const client = new GotClient(url);

    // when
    const response = async () => await client.retrieve();

    // then
    await expect(response).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Internal Server Error"`,
    );
  });

  describe('body', () => {
    it('json 데이터로 요청을 보낼수 있다.', async () => {
      // given
      const url = 'http://localhost:4321';
      nock(url).post('/', { key: 'value' }).reply(200, 'body');
      const client = new GotClient(url);

      // when
      const response = await client
        .url(url)
        .post()
        .body(BodyInserter.fromJSON({ key: 'value' }))
        .retrieve();

      // then
      expect(response.statusCode).toBe(200);
      expect(response.rawBody).toBe('body');
    });

    it('form 데이터로 요청을 보낼수 있다.', async () => {
      // given
      const url = 'http://localhost:4321';
      nock(url).post('/', 'key=value').reply(200, 'body');
      const client = new GotClient(url);

      // when
      const response = await client
        .url(url)
        .post()
        .body(BodyInserter.fromFormData({ key: 'value' }))
        .retrieve();

      // then
      expect(response.statusCode).toBe(200);
      expect(response.rawBody).toBe('body');
    });

    it('text 데이터로 요청을 보낼수 있다.', async () => {
      // given
      const url = 'http://localhost:4321';
      const text = Buffer.from('text');
      nock(url).post('/', text).reply(200, 'body');
      const client = new GotClient(url);

      // when
      const response = await client
        .url(url)
        .post()
        .body(BodyInserter.fromText(text))
        .retrieve();

      // then
      expect(response.statusCode).toBe(200);
      expect(response.rawBody).toBe('body');
    });
  });
});
