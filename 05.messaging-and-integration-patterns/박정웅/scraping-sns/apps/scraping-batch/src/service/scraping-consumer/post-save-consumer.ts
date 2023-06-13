import { Injectable, Logger, Optional } from '@nestjs/common';
import { ScrapingPostConsumerFactory } from '@app/common/scraping-post-consumer.factory';
import { TransformedPost } from '@app/scraping-post/post-transformer';
import { filter } from 'rxjs';

@Injectable()
export class PostSaveConsumer {
  constructor(
    private readonly scrapingPostConsumerFactory: ScrapingPostConsumerFactory,
    @Optional()
    private readonly logger: Logger = new Logger(PostSaveConsumer.name),
  ) {
    this.scrapingPostConsumerFactory
      .create()
      .pipe(filter(Array.isArray))
      .subscribe((post) => {
        this.consume(post);
      });
  }

  async consume(post: TransformedPost[]) {
    this.logger.debug(`save post ${JSON.stringify(post, null, 2)}`);
  }
}
