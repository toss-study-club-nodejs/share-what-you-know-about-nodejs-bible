# scraping sns

node.js 바이블에서 소개한 패턴을 모두 적용한 예제 프로젝트

> 주의
> 실제로는 이러한 패턴을 적용하지 않아도 될 정도의 비지니스일수 있습니다.
> 
> 패턴 적용의 예시를 보여주기 위함이니 참고하여 봐주세요.
> 
> 또한 각 코드의 패턴 외 레이어나 아키텍처에 대한 구조는 좋은 구조가 아니니 이또한 참고하여 봐주세요. 

## 프로젝트 실행
```
pnpm run start:all
```

## 동작 설명
인스타그램, 페이스북에 올라온 post 를 스크래핑하고 저장하는 서비스입니다.

스크래핑 트리거는 scraping-sms 웹에서의 요청으로 받습니다.

```
curl --location --request POST 'http://localhost:3000/post/scraping/instagram/userid' \
--data ''
```

실제 스크래핑은 scraping-batch 에서 수행됩니다.

스크래핑의 결과는 1초마다 저장하고 스크래핑의 시작과 처리 중 끝에 대한 노티가 실행됩니다.

- 스트림 패턴, pipe 패턴: [scraping.service.ts](apps%2Fscraping-batch%2Fsrc%2Fservice%2Fscraping.service.ts)
- 싱글톤 패턴: [scraping-post-consumer.factory.ts](libs%2Fcommon%2Fsrc%2Fscraping-post-consumer.factory.ts)
- 펙토리 패턴: [scraping-post-consumer.factory.ts](libs%2Fcommon%2Fsrc%2Fscraping-post-consumer.factory.ts)
- 프록시, 데코레이터 패턴: [cache-login.service.ts](apps%2Fscraping-batch%2Fsrc%2Fservice%2Fcache-login%2Fcache-login.service.ts)
- 전략 패턴: [login-service-strategy.ts](libs%2Flogin%2Fsrc%2Flogin-service-strategy.ts)
- 템플릿: [post-transformer.ts](libs%2Fscraping-post%2Fsrc%2Fpost-transformer.ts)
- 반복자: [instagram-post-scraper.ts](libs%2Finstagram%2Fsrc%2Finstagram-post-scraper.ts)
- pub,
  sub: [scraping.service.ts](apps%2Fscraping-batch%2Fsrc%2Fservice%2Fscraping.service.ts), [post-save-consumer.ts](apps%2Fscraping-batch%2Fsrc%2Fservice%2Fscraping-consumer%2Fpost-save-consumer.ts)
- pull,
  push: [scraping-batch.module.ts](apps%2Fscraping-batch%2Fsrc%2Fscraping-batch.module.ts), [post.controller.ts](apps%2Fscraping-sns%2Fsrc%2Fpost%2Fpost.controller.ts)
- 상태(State): [scraping-notifier-context.ts](libs%2Fscraping-notifier%2Fsrc%2Fstate%2Fscraping-notifier-context.ts)
- 명령: 못했어여 ... help..
- 미들웨어
- DI, 컴포짓 패턴: 대부분의 코드에서 .. 