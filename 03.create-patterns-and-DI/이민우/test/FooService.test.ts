import { TestWebClientService } from './web-client/creator/TestWebClientService';
import { StubWebClient } from './web-client/StubWebClient';
import { FooService } from '../src/FooService';

describe('TestWebClientService', () => {
  let fooService: FooService;
  const stubWebClient = StubWebClient.getInstance();

  beforeAll(() => {
    fooService = new FooService(new TestWebClientService());
  });

  beforeEach(() => stubWebClient.clear());

  describe('getName', () => {
    it('이름을 조회한다.', async () => {
      // given
      const url = 'http://www.example.com';
      stubWebClient.url(url).get().addResponse({ name: 'haru' });

      // when
      const response = await fooService.getName(url);

      // then
      expect(response.name).toBe('haru');
    });

    it('조회시 오류가 발생한다.', async () => {
      // given
      const url = 'http://www.example.com';
      stubWebClient.url(url).get().addError('error response', 400);

      // when
      const response = async () => fooService.getName(url);

      // then
      await expect(response).rejects.toThrow('error response');
    });
  });
});
