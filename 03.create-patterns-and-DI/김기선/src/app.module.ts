import { Module } from '@nestjs/common'
import { MessageModule } from './message/message.module'
import { GithubModule } from './github/github.module'

@Module({
	imports: [ MessageModule, GithubModule ],
})
export class AppModule {}
