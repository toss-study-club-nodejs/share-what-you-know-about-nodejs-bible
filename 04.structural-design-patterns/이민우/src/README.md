## Nest.js는 대상 타입을 어떻게 알아서 의존성 주입을 해주는 것일까?

### 발단

[TS-playground](https://www.typescriptlang.org/play?experimentalDecorators=true&emitDecoratorMetadata=true#code/MYGwhgzhAECqEFMBOAlBAHA9hAlgF0yQE9oBvAXwChLRIZ5kBlZANx2ATMummEwDsIeJAFdgBJAAp0SHCzB5OSBGAAmAkCRGJUGbPkJEAXHB1osuCUQCUZKuSA)

```ts
import {Injectable} from "@nestjs/common";

@Injectable()
class UserRepository {
}

@Injectable()
class UserService {
  // 이전 시간에 배운 것처럼 UserRepository를 생성자 주입 시키는 방식
  // 근데 어떻게 TS 에서는 userRepository 가 UserRepository 타입인걸 알까?
  constructor(private readonly userRepository: UserRepository) {
  }
}
```

JS로 컴파일 했을때 타입이 대한 정보는 사라진다.

위에 작성된 코드를 컴파일한 js 코드의 결과는 아래와 같다.

```js

"use strict";

class UserRepository {
}

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
}
```

### 데코레이터 와 reflect-metadata

**데코레이터**

- 클래스 선언, 메서드, 프로퍼티, 매개변수에 부가적인 정보를 첨부할 수 있게 해주는 문법
- `@`를 사용하여 데코레이터를 사용할 수 있다.
- 즉시 실행 함수

[TS-playground](https://www.typescriptlang.org/play?experimentalDecorators=true&module=1#code/MYewdgzgLgBMA2BDCEAiBTUAnRURYC4YBhJFDbXfGAXhgAopEsBzdKASloD4YBvAFAw44CCHjoAdPBAt6AIgTIIMACaZ8VLPIA0MJq3aSADlhB4oAT2PoOAbgEBfBwNCRYAW3YALEKoqaeIQwALI+fgE4QbQMBmxQeqYgNlhWANLollw0vILCbmIS0rIKXlC+qmoaUfi6+szxiWYp6Zn2Ti4FsEktlpFaRAAKzeipfdVaMYwN7E3Jo61ZPPxCIpDiUjJy8j0LllWUQXVxszC7YxlZDs4CrqLdzIhlo-1BQ4-PWK-UdPSrJwlVudFjogR92KMAJJgdQADwE2VyqwKG2K22M4KgowOgVqegBc16l0SmKhMPQsPaNwEAAElOQJkFXGQVAAVdDQUjKFbCGnA8aHfBAgCuACN4ABLYD6DlQYbzMZEaBYCVgFguXllCrfLAi8VSmXQMLlPz0Pmkr6M6hY6CDC1KqAqtUcB1Olg84QwLDsYVYMCGuUWhzCRxOIA)

```ts
const classDecorator: ClassDecorator = (target) => {
  console.log("class decorator", target.prototype);
};

const propertyDecorator: PropertyDecorator = (target, propertyKey) => {
  console.log("property decorator", target, propertyKey);
};

const methodDecorator: MethodDecorator = (target, propertyKey) => {
  console.log("method decorator", target, propertyKey);
};

const parameterDecorator: ParameterDecorator = (
  target,
  propertyKey,
  parameterIndex
) => {
  console.log("parameter decorator", target, propertyKey, parameterIndex);
};

@classDecorator
class TestClass {
  @propertyDecorator
  public testProperty: string;

  @methodDecorator
  public testMethod(@parameterDecorator testParameter: string): string {
    return testParameter;
  }
}

```

데코레이터 파라미터 타입은 다음과 같다.

```
target: 데코레이터가 적용된 클래스의 prototype 또는 클래스 자체  
propertyKey: 데코레이터가 적용된 속성의 이름  
parameterIndex: 데코레이터가 적용된 함수, 메소드 매개변수의 위치(0부터 시작)
```

위 해당 파일을 실행했을때 다음과 같은 결과가 나온다.

```
[LOG]: "property decorator",  TestClass: {},  "testProperty" 
[LOG]: "parameter decorator",  TestClass: {},  "testMethod",  0 
[LOG]: "method decorator",  TestClass: {},  "testMethod" 
[LOG]: "class decorator",  TestClass: {} 
```

**reflect-metadata**

- 클래스, 속성, 매개변수 등에 메타데이터를 추가할 수 있도록 도와주는 라이브러리
- 메타데이터의 예로 클래스 메소드, 생성자의 파라미터 타입, 반환 타입
- 런타임에서 클래스의 프로퍼티나 메소드의 타입정보를 알 수 있도록 도와줌.

적용하기전,

1. 진입부 파일(ex) index.ts) 상단에 라이브러리 import 코드

```ts
import "reflect-metadata";
```

2. tsconfig.json 파일에 다음과 같은 옵션 추가

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    // 데코레이터 기능 지원
    "emitDecoratorMetadata": true
    // reflect-metadata 라이브러리와 함께 동작하는 데코레이터에 대한 타입 메타데이터를 생성
  }
}
```

적용

예시) [TS-playground](https://www.typescriptlang.org/play?experimentalDecorators=true&emitDecoratorMetadata=true#code/GYVwdgxgLglg9mABAGTgcwLIFMoAs4AmAFAFCKJQCGATmjgFyKVgCeANGYgA7VxdbUoLANJYWjAM5RqMMGkQAfRBJYBbAEZwANh3IEsEiDK5Q41RgAVe-QSwAiBozBNmSASkQBvAL5kSELUoJCUQHVTgvTgABVEwcfAJOLhB1LRgIRGA4OCJ1GkYwEA0BDx8SbyA)

- __metadata() 함수가 추가

```ts
var __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
```

- [Reflect.metadata 함수](https://rbuckton.github.io/reflect-metadata/)는 `reflect-methdata`에서 제공해주는 함수

- Design-time type annotations
    - design:type: 매타 데이터의 타입 정보
    - design:paramtypes: 매개변수 타입 정보
    - design:returntype: 반환 타입 정보


