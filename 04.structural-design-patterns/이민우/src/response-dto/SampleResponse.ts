import {Exclude, Expose} from "class-transformer";


// private 필드는 제외하고, get 프로퍼티만 노출한다.
// private field1, field2, field3 -> @Exclude()
// get field1, field2, field3 -> @Expose()
class SampleResponse {
  @Exclude()
  private readonly _field: string;

  constructor(field: string) {
    this._field = field;
  }

  @Expose()
  get getField() {
    return this._field;
  }
}
