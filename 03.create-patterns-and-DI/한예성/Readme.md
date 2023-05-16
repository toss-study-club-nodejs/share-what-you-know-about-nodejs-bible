# 3회차 공유하고 싶은 내용

## 1. singleton 패턴 재사용 하기
singleton 객체를 만들때, 객체를 싱글톤화 시켜주는 로직 만을 분리해 재사용 할수 있을지에 대해 찾아보았습니다.  
```
./src/singleton-decorator-block-new.ts
./src/singleton-decorator-with-closure.ts
```

출처
mixins, 데코레이터 - https://www.typescriptlang.org/docs/handbook/mixins.html

## 2. nestjs의 싱글톤 scope와 useFactory - durable?

nestjs에서 프로바이더를 요청 URL의 파라미터에 따라 동적으로 생성하고 싶은 이슈가 있었는데요, 

```
/report?store=amazon => APP_REPORT_OUTBOUND_PORT로 amazon 어댑터를 사용
/report?store=apple  => APP_REPORT_OUTBOUND_PORT로 apple 어댑터를 사용
/report?store=google => APP_REPORT_OUTBOUND_PORT로 google 어댑터를 사용
```

## durable provider 적용 전

요청에 따라 provider를 생성해 주기 위해 provider scope를 REQUEST로 조정 한 후, 
nestjs의 useFactory 커스텀 프로바이더를 사용해본 적이 있는데요,

```typescript
@Module({
  ...
  providers: [
    ...
    {
      provide: APP_REPORT_OUTBOUND_PORT,
      useFactory: async (request: Request): Promise<AppReportOutboundPort> => {
        const store = request.query?.store;

        switch (store) {
          case 'APP_STORE':
            return new AppStoreAdaptor();
          case 'GOOGLE_PLAY':
            return new GooglePlayAdaptor();
          case 'AMAZON':
            return new AmazonAdaptor();
          default:
            return new AppStoreAdaptor();
        }
      },
      inject: [REQUEST],
      scope: Scope.REQUEST,
    },
  ],
})
export class ReportModule {}

```

provider scope를 REQUEST 로 설정 할 경우, 기본 방식인 싱글톤 방식으로 provider들이 생성 된 후 재사용 되는 것이 아니라, 매 요청마다 새로운 인스턴스를 만들어 주입 합니다.  

공식 문서에는 아래와 같이 이런 상황은 기본 옵션인 싱글톤 프로바이더를 사용하지 못하므로 요청이 많을 경우
성능이 하락한다고 이야기 하고 있는데요 

[nestjs 문서 - injection scopes](https://docs.nestjs.com/fundamentals/injection-scopes#performance)

| 그래서 각 개별 요청마다 인스턴스를 다시 생성 하기 때문에 애플리케이션 성능에 영향을 미칩니다.   
| 만약 병렬로 30k 요청이 있다고 가정하면 30k 임시 인스턴스가 있음을 의미합니다.

확인을 위헤 각 Adaptor 클래스가 생성 될 때 로그를 찍어보면

AmazonAdaptor
```typescript
export class AmazonAdaptor implements AppReportOutboundPort {
  constructor() {
    console.log('instanciate AmazonAdaptor');
  }
  ...
}
```
GooglePlayAdaptor
```typescript
export class GooglePlayAdaptor implements AppReportOutboundPort {
  constructor() {
    console.log('instanciate GooglePlayAdaptor');
  }
  ...
}
```


/reports?store=AMAZON 와 /reports?store=GOOGLE_PLAY로 여러번 요청을 보냈을 때,   
문서에 나온 경고 대로 각 요청 마다 새로운 객체가 생성되는것을 확인 할 수 있었습니다.
```typescript
  instanciate AmazonAdaptor <- 매 요청마다 수행
  [INFO] Amazon get sales report start!
  instanciate AmazonAdaptor
  [INFO] Amazon get sales report start!
  instanciate AmazonAdaptor 
  [INFO] Amazon get sales report start!
  instanciate AmazonAdaptor
  [INFO] Amazon get sales report start!
  instanciate GooglePlayAdaptor
  [INFO] GooglePlay get sales report start!
  instanciate GooglePlayAdaptor
  [INFO] GooglePlay get sales report start!
  instanciate GooglePlayAdaptor
  [INFO] GooglePlay get sales report start!
```

## durable provider 적용 후

nestjs에서는 durable provider 설정을 통해   
한번 생성된 프로바이더를 커스텀한 기준에의해 저장 해두었다가 재사용 할 수 있도록 하는 옵션을 제공하고 있었습니다.

durable-provider.setup.ts
커스텀 컨텍스트 집계 전략 생성
```typescript
import {
  ContextId,
  ContextIdFactory,
  ContextIdStrategy,
  HostComponentInfo,
  ModuleRef,
} from '@nestjs/core';
import { Request } from 'express';

const stores = new Map<string, ContextId>();

export class AggregateByStoreContextIdStrategy implements ContextIdStrategy {
  attach(contextId: ContextId, request: Request ) {
    const storeId = request.query.store as string;
    let storeSubTreeId: ContextId;

    if (stores.has(storeId)) {
      storeSubTreeId = stores.get(storeId);
    } else {
      storeSubTreeId = ContextIdFactory.create();
      stores.set(storeId, storeSubTreeId);
    }

    // If tree is not durable, return the original "contextId" object
    return {
      resolve: (info: HostComponentInfo) =>
        info.isTreeDurable ? storeSubTreeId : contextId,
        payload: request, // useFactory로 request 전달
      }
  }
}
```


main.ts
```typescript
import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AggregateByStoreContextIdStrategy } from './durable-provider.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  ContextIdFactory.apply(new AggregateByStoreContextIdStrategy()); //<- 생성한 커스텀 컨텍스트 집계 전략 등록
  console.log('Nest Listen to 8000');
  await app.listen(8000);
}
bootstrap();
```

report.module.ts
```typescript
@Module({
  ...
    providers: [
  ...
    {
      provide: APP_REPORT_OUTBOUND_PORT,
      useFactory: async (request: Request): Promise<AppReportOutboundPort> => {
        const store = request.query?.store;

        switch (store) {
          case 'APP_STORE':
            return new AppStoreAdaptor();
          case 'GOOGLE_PLAY':
            return new GooglePlayAdaptor();
          case 'AMAZON':
            return new AmazonAdaptor();
          default:
            return new AppStoreAdaptor();
        }
      },
      inject: [REQUEST],
      scope: Scope.REQUEST,
      durable: true, <- useFactory 커스텀 프로바이더에 durable 설정 활성화 
    },
],
})
export class ReportModule {}

```

/reports?store=AMAZON 와 /reports?store=GOOGLE_PLAY로 여러번 요청을 보냈을 때,   
문서에 나온 경고 대로 각 요청 마다 새로운 객체가 생성되는것을 확인 할 수 있었습니다.
```typescript
  instanciate AmazonAdaptor <- 최초 한번만 수행
  [INFO] Amazon get sales report start!
  [INFO] Amazon get sales report start!
  [INFO] Amazon get sales report start!
  instanciate GooglePlayAdaptor <- 최초 한번만 수행
  [INFO] GooglePlay get sales report start!
  [INFO] GooglePlay get sales report start!
  [INFO] GooglePlay get sales report start!
  [INFO] Amazon get sales report start!
  [INFO] Amazon get sales report start!
  [INFO] GooglePlay get sales report start!
  [INFO] GooglePlay get sales report start!
```

혹시 이런 상황 이외에 요청에 따라 provider를 이렇게 나누어 적용하는 이슈가 있을까요?


# 참고  
https://docs.nestjs.com/fundamentals/dynamic-modules
https://docs.nestjs.com/fundamentals/custom-providers#use-factory
https://docs.nestjs.com/fundamentals/injection-scopes#durable-providers
https://docs.nestjs.com/fundamentals/module-ref#registering-request-provider
https://github.com/vizio360/nestJSDurableProvidersIssue