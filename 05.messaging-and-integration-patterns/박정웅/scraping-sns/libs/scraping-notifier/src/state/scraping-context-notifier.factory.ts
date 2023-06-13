import { ScrapingNotifierService } from '@app/scraping-notifier/scraping-notifier.service';
import { ScrapingStartNotifierService } from '@app/scraping-notifier/impl/scraping-start-notifier.service';
import { ScrapingProcessingNotifierService } from '@app/scraping-notifier/impl/scraping-processing-notifier.service';
import { ScrapingEndNotifierService } from '@app/scraping-notifier/impl/scraping-end-notifier.service';

export class ScrapingContextNotifierFactory {
  static create(state: Map<string, ScrapingNotifierService>) {
    return new ScrapingStartNotifierService(
      state,
      new ScrapingProcessingNotifierService(
        state,
        new ScrapingEndNotifierService(state),
      ),
    );
  }
}
