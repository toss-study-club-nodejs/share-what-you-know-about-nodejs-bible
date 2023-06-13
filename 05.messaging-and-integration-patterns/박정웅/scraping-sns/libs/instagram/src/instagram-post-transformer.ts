import {
  BasePostTransformer,
  TransformedPost,
} from '@app/scraping-post/post-transformer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InstagramPostTransformer extends BasePostTransformer {
  parse(post: Record<string, any>): TransformedPost {
    return {
      title: '제목',
      content: '내용',
      url: 'http://instargram.com',
      date: `2023-06-13`,
      userId: 'userid',
    };
  }
}
