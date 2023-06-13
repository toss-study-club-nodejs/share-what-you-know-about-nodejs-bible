import { Module } from '@nestjs/common';
import { ScrapingContextNotifierService } from '@app/scraping-notifier/state/scraping-notifier-context';

@Module({
  providers: [ScrapingContextNotifierService],
  exports: [ScrapingContextNotifierService],
})
export class ScrapingNotifierModule {}
