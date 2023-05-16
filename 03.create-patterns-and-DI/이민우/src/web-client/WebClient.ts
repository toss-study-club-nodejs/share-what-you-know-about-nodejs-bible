import { MediaType } from "./http/MediaType";
import { BodyInserter } from "./http/BodyInserter";
import { ResponseSpec } from "./http/ResponseSpec";

export interface WebClient {
  get(): this;

  post(): this;

  put(): this;

  patch(): this;

  delete(): this;

  url(url: string): this;

  accept(mediaType: MediaType): this;

  header(param: Record<string, string | string[]>): this;

  body<T>(body: BodyInserter<T>): this;

  timeout(timeout: number): this;

  retrieve(): Promise<ResponseSpec>;
}
