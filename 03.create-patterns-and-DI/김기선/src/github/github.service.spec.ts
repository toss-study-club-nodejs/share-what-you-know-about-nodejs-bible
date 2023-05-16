import { Test, TestingModule } from '@nestjs/testing'
import { IGithubService } from './github.interface'
import { GithubTestService } from './github_test.service'
import { GithubModule } from './github.module'

describe('GithubService', () => {
	let githubService: IGithubService

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [ GithubModule ],
		})
			.overrideProvider('IGithubService')
			.useClass(GithubTestService)
			.compile()

		githubService = await app.get('IGithubService')
	})

	describe('getRepositories', () => {
		it('should return test repository list', () => {
			expect(githubService.getRepositories()).toStrictEqual([ 'test_repository' ])
		})
	})
})
