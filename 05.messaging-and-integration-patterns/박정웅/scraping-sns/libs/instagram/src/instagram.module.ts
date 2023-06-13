import { Module } from '@nestjs/common';
import {
  scrapingPostStrategyMap,
  transformerPostStrategyMap,
} from '@app/scraping-post/scraping-post-strategy';
import { loginServiceStrategyMap } from '@app/login/login-service-strategy';
import { InstagramLoginService } from '@app/instagram/instagram-login.service';
import { InstagramPostScraper } from '@app/instagram/instagram-post-scraper';
import { InstagramPostTransformer } from '@app/instagram/instagram-post-transformer';

@Module({
  providers: [
    InstagramLoginService,
    InstagramPostScraper,
    InstagramPostTransformer,
  ],
  exports: [
    InstagramLoginService,
    InstagramPostScraper,
    InstagramPostTransformer,
  ],
})
export class InstagramModule {
  constructor(
    instagramPostScraper: InstagramPostScraper,
    instagramLoginService: InstagramLoginService,
    postTransformer: InstagramPostTransformer,
  ) {
    scrapingPostStrategyMap.set('instagram', instagramPostScraper);
    transformerPostStrategyMap.set('instagram', postTransformer);
    loginServiceStrategyMap.set('instagram', instagramLoginService);
  }
}
