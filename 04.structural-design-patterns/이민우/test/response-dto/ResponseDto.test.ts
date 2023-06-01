import {ResponseDto} from "../../src/response-dto/ResponseDto";
import {Expose, instanceToPlain} from "class-transformer";

describe('ResponseDto decorator', () => {
  it('get 프로퍼티에 @Expose 데코레이터를 선언한다.', () => {
    // given
    @ResponseDto()
    class Sample {
      private readonly _field: string;

      constructor(field: string) {
        this._field = field;
      }

      get getField() {
        return this._field;
      }
    }

    const sample = new Sample('test');

    // when
    const result = instanceToPlain(sample);

    // then
    expect(result).toStrictEqual({getField: 'test'});
  });

  it('expose 데코레이터를 가진 get 프로퍼티는 우선시한다.', () => {
    // given
    @ResponseDto()
    class Sample {
      _field: string;

      constructor(field: string) {
        this._field = field;
      }

      @Expose({name: 'exchangeField'})
      get getField() {
        return this._field;
      }
    }

    const sample = new Sample('test');

    // when
    const result = instanceToPlain(sample);

    // then
    expect(result).toStrictEqual({exchangeField: 'test'});
  });
})
