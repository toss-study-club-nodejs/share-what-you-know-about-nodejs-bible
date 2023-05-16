import { MediaType } from "./MediaType";

export class BodyInserter<T> {
  private constructor(
    private readonly _mediaType: MediaType,
    private readonly _data: T,
  ) {}

  get mediaType(): MediaType {
    return this._mediaType;
  }

  get data(): T {
    return this._data;
  }

  static fromJSON(json: Record<string, unknown>) {
    return new BodyInserter(MediaType.APPLICATION_JSON, json);
  }

  static fromFormData(form: Record<string, unknown>) {
    return new BodyInserter(MediaType.APPLICATION_FORM_URLENCODED, form);
  }

  static fromText(text: string | Buffer) {
    return new BodyInserter(MediaType.TEXT_PLAIN, text);
  }
}
