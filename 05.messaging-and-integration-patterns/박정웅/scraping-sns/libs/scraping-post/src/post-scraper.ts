export interface PostScraper {
  getPost(): AsyncGenerator<Post>;
}

export type Post = {
  title: string;
  content: string;
  url: string;
  date: Date;
};
