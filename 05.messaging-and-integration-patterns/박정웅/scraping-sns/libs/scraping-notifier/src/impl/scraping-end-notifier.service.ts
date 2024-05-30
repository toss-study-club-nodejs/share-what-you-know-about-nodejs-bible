import { ScrapingNotifierService } from '@app/scraping-notifier/scraping-notifier.service';
import { State } from '@app/scraping-notifier/state/state';
import { Logger } from '@nestjs/common';
import { TransformedPost } from '@app/scraping-post/post-transformer';

export class ScrapingEndNotifierService
  extends State
  implements ScrapingNotifierService
{
  private readonly logger = new Logger(ScrapingEndNotifierService.name);

  constructor(state: Map<string, ScrapingNotifierService>) {
    super(state);
  }

  async notify(userId: string, posts: TransformedPost[]): Promise<void> {
    this.logger.debug(`notify end [${userId}]`);
    this.removeState(userId);
  }
}
