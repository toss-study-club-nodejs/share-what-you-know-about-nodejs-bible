import { TransformedPost } from '@app/scraping-post/post-transformer';

export interface ScrapingNotifierService {
  notify(userId: string, posts: TransformedPost[]): Promise<void>;
}
