import { UrlBuilder } from "../../../src/web-client/http/UrlBuilder";

describe('UrlBuilder', () => {
  it.each([
    [
      'https://www.google.com',
      { hello: 'world' },
      'https://www.google.com?hello=world',
    ],
  ])('url과 query를 조합해준다.', (url, query, expectUrl) => {
    const urlBuilder = UrlBuilder.create(url).queryParam(
      Object.keys(query)[0],
      Object.values(query)[0],
    );

    const result = urlBuilder.build();

    expect(result).toBe(expectUrl);
  });
});
