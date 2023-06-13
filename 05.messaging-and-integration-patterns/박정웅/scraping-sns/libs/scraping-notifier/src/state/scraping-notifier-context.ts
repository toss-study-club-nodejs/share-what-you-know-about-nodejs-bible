import { ScrapingNotifierService } from '@app/scraping-notifier/scraping-notifier.service';
import { Injectable } from '@nestjs/common';
import { ScrapingContextNotifierFactory } from '@app/scraping-notifier/state/scraping-context-notifier.factory';
import { TransformedPost } from '@app/scraping-post/post-transformer';

@Injectable()
export class ScrapingContextNotifierService implements ScrapingNotifierService {
  public readonly state = new Map<string, ScrapingNotifierService>();
  private readonly notifier: ScrapingNotifierService =
    ScrapingContextNotifierFactory.create(this.state);

  async notify(userId: string, posts: TransformedPost[]): Promise<void> {
    const service = this.state.get(userId) ?? this.notifier;
    await service.notify(userId, posts);
  }
}
