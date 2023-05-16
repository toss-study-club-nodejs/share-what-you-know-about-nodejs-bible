import { Injectable } from '@nestjs/common'
import { IGithubService } from './github.interface'

@Injectable()
export class GithubService implements IGithubService {
	getRepositories(): string[] {
		const github = new GithubSdk()
		return github.getRepository()
	}

}

class GithubSdk {
	getRepository() {
		return [ 'a_repository', 'b_repository' ]
	}
}
