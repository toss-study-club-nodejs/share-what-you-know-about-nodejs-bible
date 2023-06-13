import { ScrapingPostConsumerFactory } from '@app/common/scraping-post-consumer.factory';
import { Injectable, Logger, Optional } from '@nestjs/common';
import { ScrapingContextNotifierService } from '@app/scraping-notifier/state/scraping-notifier-context';
import { TransformedPost } from '@app/scraping-post/post-transformer';
import { groupWith } from 'ramda';

@Injectable()
export class PostNotifyConsumer {
  constructor(
    private readonly scrapingPostConsumerFactory: ScrapingPostConsumerFactory,
    private readonly nofitier: ScrapingContextNotifierService,
    @Optional()
    private readonly logger: Logger = new Logger(PostNotifyConsumer.name),
  ) {
    this.scrapingPostConsumerFactory.create().subscribe((post) => {
      if (Array.isArray(post)) {
        this.consume(post);
      } else {
        this.nofitier.notify(post.userId, []);
        this.nofitier.notify(post.userId, []);
      }
    });
  }

  async consume(post: TransformedPost[]) {
    const groupByUserId = groupWith<TransformedPost>(
      (a, b) => a.userId === b.userId,
    )(post);
    groupByUserId.forEach((posts) => {
      if (posts.length > 0) {
        this.nofitier.notify(posts[0].userId, posts);
      }
    });
  }
}
