export class SampleService {
  //new 생성 키워드를 막아서 외부에서 인스턴스를 생성하지 못하게 함
  private constructor() {}

  //생성 로직을 이 함수를 사용하게끔 강제
  static create() {
    //복잡한 생성 로직
    return new this();
  }

  getFoo() {
    return 'foo';
  }
}
