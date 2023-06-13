import { Post, PostScraper } from '@app/scraping-post/post-scraper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FacebookPostScraper implements PostScraper {
  async *getPost(): AsyncGenerator<Post> {
    yield {
      title: 'title',
      content: 'content',
      url: 'url',
      date: new Date(),
    };
  }
}
