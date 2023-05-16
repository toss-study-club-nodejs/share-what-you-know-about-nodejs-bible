export class UrlBuilder {
  // @ts-ignore
  #url: string;
  #queryList: URLSearchParams;

  constructor(url?: string) {
    this.#queryList = new URLSearchParams();
    if (url) {
      this.url(url);
    }
  }

  static create(url?: string): UrlBuilder {
    return new UrlBuilder(url);
  }

  url(url: string): this {
    this.#url = url;

    return this;
  }

  queryParam(key: string, value: string): this {
    this.#queryList.append(key, value);

    return this;
  }

  build(): string {
    return `${this.#url}?${this.#queryList.toString()}`;
  }
}
