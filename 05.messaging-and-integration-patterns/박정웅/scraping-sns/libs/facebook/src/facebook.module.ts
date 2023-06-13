import { Module } from '@nestjs/common';
import {
  scrapingPostStrategyMap,
  transformerPostStrategyMap,
} from '@app/scraping-post/scraping-post-strategy';
import { loginServiceStrategyMap } from '@app/login/login-service-strategy';
import { FacebookLoginService } from '@app/facebook/facebook-login.service';
import { FacebookPostScraper } from '@app/facebook/facebook-post-scraper';
import { FacebookPostTransformer } from '@app/facebook/facebook-post-transformer';

@Module({
  providers: [
    FacebookLoginService,
    FacebookPostScraper,
    FacebookPostTransformer,
  ],
  exports: [FacebookLoginService, FacebookPostScraper, FacebookPostTransformer],
})
export class FacebookModule {
  constructor(
    postScraper: FacebookPostScraper,
    loginService: FacebookLoginService,
    postTransformer: FacebookPostTransformer,
  ) {
    scrapingPostStrategyMap.set('facebook', postScraper);
    transformerPostStrategyMap.set('facebook', postTransformer);
    loginServiceStrategyMap.set('facebook', loginService);
  }
}
