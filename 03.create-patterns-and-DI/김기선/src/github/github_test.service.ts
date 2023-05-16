import { Injectable } from '@nestjs/common'
import { IGithubService } from './github.interface'

@Injectable()
export class GithubTestService implements IGithubService {
	getRepositories(): string[] {
		return [ 'test_repository' ]
	}

}
