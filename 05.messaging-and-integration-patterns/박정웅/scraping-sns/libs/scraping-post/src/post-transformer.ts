import { Post } from '@app/scraping-post/post-scraper';
import { filter, pipe, tap } from 'ramda';

export interface PostTransformer {
  transform(post: unknown): TransformedPost;
}

export abstract class BasePostTransformer implements PostTransformer {
  transform(post: unknown): TransformedPost {
    return pipe(
      filter(this.isNotNull),
      this.toObject,
      this.parse,
      tap(this.validate),
    )(post);
  }

  protected abstract parse(post: Record<string, any>): TransformedPost;

  protected toObject(post: unknown): Record<string, any> {
    return post;
  }

  protected isNotNull(post: unknown): boolean {
    return post !== null;
  }

  protected validate(post: TransformedPost) {
    post;
  }
}

export type TransformedPost = Omit<Post, 'date'> & {
  date: `${string}-${string}-${string}`;
  userId: string;
};
