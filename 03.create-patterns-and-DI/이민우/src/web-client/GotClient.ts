import got, { ExtendOptions, Method } from 'got';
import { WebClient } from "./WebClient";
import { MediaType } from "./http/MediaType";
import { BodyInserter } from "./http/BodyInserter";
import { ResponseSpec } from "./http/ResponseSpec";

export class GotClient implements WebClient {
  readonly #options: ExtendOptions;

  constructor(url?: string, requestTimeout = 5000) {
    this.#options = {
      method: 'GET',
      url: url,
      timeout: {
        request: requestTimeout,
      },
    };
  }

  get(): this {
    return this.setMethod('GET');
  }

  post(): this {
    return this.setMethod('POST');
  }

  put(): this {
    return this.setMethod('PUT');
  }

  patch(): this {
    return this.setMethod('PATCH');
  }

  delete(): this {
    return this.setMethod('DELETE');
  }

  url(url: string): this {
    this.#options.url = url;
    return this;
  }

  header(param: Record<string, string | string[]>): this {
    this.#options.headers = param;
    return this;
  }

  accept(mediaType: MediaType): this {
    this.#options.headers = {
      ...this.#options.headers,
      'Content-Type': mediaType,
    };
    return this;
  }

  body<T>(body: BodyInserter<T>): this {
    this.accept(body.mediaType);

    switch (body.mediaType) {
      case MediaType.APPLICATION_JSON:
        this.#options.json = body.data as Record<string, unknown>;
        break;
      case MediaType.APPLICATION_FORM_URLENCODED:
        this.#options.form = body.data as Record<string, unknown>;
        break;
      default:
        this.#options.body = body.data as any;
    }

    return this;
  }

  timeout(timeout: number): this {
    this.#options.timeout = {
      request: timeout,
    };

    return this;
  }

  async retrieve(): Promise<ResponseSpec> {
    try {
      const response = await got({
        ...this.#options,
        isStream: false,
        resolveBodyOnly: false,
        responseType: 'text',
      });

      return new ResponseSpec(response.statusCode, response.body);
    } catch (e) {
      throw new Error(e.message);
    }
  }

  private setMethod(method: Method): this {
    this.#options.method = method;
    return this;
  }
}
