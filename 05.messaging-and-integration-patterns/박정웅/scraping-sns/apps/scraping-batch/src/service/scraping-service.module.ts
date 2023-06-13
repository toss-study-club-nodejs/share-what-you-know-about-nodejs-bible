import { Module } from '@nestjs/common';
import { ScrapingPostStrategyModule } from '@app/scraping-post/scraping-post-strategy.module';
import { ScrapingService } from './scraping.service';
import { CacheLoginServiceModule } from './cache-login/cache-login-service.module';
import { PostSaveConsumer } from './scraping-consumer/post-save-consumer';
import { LoginServiceStrategyModule } from '@app/login/login-service-strategy.module';
import { InstagramModule } from '@app/instagram/instagram.module';
import { FacebookModule } from '@app/facebook/facebook.module';
import { ScrapingPostConsumerFactory } from '@app/common/scraping-post-consumer.factory';
import { ScrapingNotifierModule } from '@app/scraping-notifier/scraping-notifier.module';
import { PostNotifyConsumer } from './scraping-consumer/post-notify-consumer';

@Module({
  imports: [
    InstagramModule,
    FacebookModule,
    CacheLoginServiceModule,
    ScrapingPostStrategyModule,
    LoginServiceStrategyModule,
    ScrapingNotifierModule,
  ],
  providers: [
    ScrapingPostConsumerFactory,
    PostSaveConsumer,
    PostNotifyConsumer,
    ScrapingService,
  ],
  exports: [ScrapingService],
})
export class ScrapingServiceModule {}
