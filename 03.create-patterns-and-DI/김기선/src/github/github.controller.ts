import { Controller, Get, Inject } from '@nestjs/common'
import { IGithubService } from './github.interface'

@Controller('githubs')
export class GithubController {

	@Inject('IGithubService')
	private readonly githubService: IGithubService

	@Get()
	getRepositories(): string[] {
		return this.githubService.getRepositories()
	}
}
