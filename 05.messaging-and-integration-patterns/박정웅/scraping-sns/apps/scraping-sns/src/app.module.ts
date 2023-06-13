import { Module } from '@nestjs/common';
import { LoginServerModule } from './login/login-server.module';
import { PostServerModule } from './post/post-server.module';
import { FacebookModule } from '@app/facebook/facebook.module';
import { InstagramModule } from '@app/instagram/instagram.module';

@Module({
  imports: [
    FacebookModule,
    InstagramModule,
    LoginServerModule,
    PostServerModule,
  ],
})
export class AppModule {}
