import { ClassConstructor, plainToInstance } from 'class-transformer';

export class ResponseSpec {
  constructor(
    private readonly _statusCode: number,
    private readonly _body: string,
  ) {}

  get statusCode(): number {
    return this._statusCode;
  }

  get rawBody(): string {
    return this._body;
  }

  toEntity<T>(entity: ClassConstructor<T>): T {
    return plainToInstance(entity, this.checkJSON<T>());
  }

  toEntityList<T>(entity: ClassConstructor<T>): T[] {
    return plainToInstance(entity, this.checkJSONArray<T>());
  }

  private checkJSON<T>(): T {
    try {
      return JSON.parse(this._body);
    } catch (e) {
      throw new Error('Invalid JSON: ' + e.message);
    }
  }

  private checkJSONArray<T>(): T[] {
    try {
      const result = JSON.parse(this._body);

      if (!Array.isArray(result)) {
        throw new Error(this._body);
      }

      return result;
    } catch (e) {
      throw new Error('Invalid JSON: ' + e.message);
    }
  }
}
