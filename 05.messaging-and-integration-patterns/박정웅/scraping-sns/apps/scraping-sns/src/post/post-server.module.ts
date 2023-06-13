import { Module } from '@nestjs/common';
import { PostController } from './post.controller';

@Module({
  controllers: [PostController],
  exports: [],
})
export class PostServerModule {}
