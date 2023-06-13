import { ScrapingNotifierService } from '@app/scraping-notifier/scraping-notifier.service';
import { State } from '@app/scraping-notifier/state/state';
import { Logger } from '@nestjs/common';
import { TransformedPost } from '@app/scraping-post/post-transformer';

export class ScrapingStartNotifierService
  extends State
  implements ScrapingNotifierService
{
  constructor(
    state: Map<string, ScrapingNotifierService>,
    private readonly next: ScrapingNotifierService,
  ) {
    super(state);
  }

  private readonly logger = new Logger(ScrapingStartNotifierService.name);

  async notify(userId: string, posts: TransformedPost[]): Promise<void> {
    this.logger.debug(
      `notify start userId: [${userId}] len: [${posts.length}]`,
    );
    this.nextState(userId, this.next);
  }
}
