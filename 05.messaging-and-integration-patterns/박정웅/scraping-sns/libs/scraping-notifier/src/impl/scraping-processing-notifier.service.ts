import { ScrapingNotifierService } from '@app/scraping-notifier/scraping-notifier.service';
import { State } from '@app/scraping-notifier/state/state';
import { Logger } from '@nestjs/common';
import { TransformedPost } from '@app/scraping-post/post-transformer';

export class ScrapingProcessingNotifierService
  extends State
  implements ScrapingNotifierService
{
  private readonly logger = new Logger(ScrapingProcessingNotifierService.name);

  constructor(
    state: Map<string, ScrapingNotifierService>,
    private readonly next: ScrapingNotifierService,
  ) {
    super(state);
  }

  async notify(userId: string, posts: TransformedPost[]): Promise<void> {
    if (posts.length > 0) {
      this.logger.debug(
        `notify processing userId: [${userId}] len:[${posts.length}]`,
      );
      return;
    }
    this.nextState(userId, this.next);
  }
}
