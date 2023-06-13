import { Post, PostScraper } from '@app/scraping-post/post-scraper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InstagramPostScraper implements PostScraper {
  async *getPost(): AsyncGenerator<Post> {
    const instagramApi = fakeAip();
    while (instagramApi.hasNext()) {
      await sleep();
      yield await instagramApi.getPost();
    }
  }
}

function fakeAip() {
  let flag = true;
  let count = 10;
  return {
    hasNext: () => flag,
    getPost: async (): Promise<Post> => {
      count--;
      if (0 > count) {
        flag = false;
      }
      return {
        title: 'title',
        content: 'content',
        url: 'url',
        date: new Date(),
      };
    },
  };
}

async function sleep() {
  return await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}
