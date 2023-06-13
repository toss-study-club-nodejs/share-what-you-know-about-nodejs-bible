import { Module } from '@nestjs/common';
import { ScrapingPostStrategy } from '@app/scraping-post/scraping-post-strategy';

@Module({
  providers: [ScrapingPostStrategy],
  exports: [ScrapingPostStrategy],
})
export class ScrapingPostStrategyModule {}
