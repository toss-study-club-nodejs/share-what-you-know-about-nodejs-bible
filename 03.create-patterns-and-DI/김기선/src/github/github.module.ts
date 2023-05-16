import { Module } from '@nestjs/common'
import { GithubService } from './github.service'
import { GithubController } from './github.controller'

@Module({
	controllers: [ GithubController ],
	providers: [
		{ provide: 'IGithubService', useClass: GithubService },
	],
})
export class GithubModule {}
