import { Google, GoogleNew } from './Google'
import { Kakao, KakaoNew } from './Kakao'
import { MyLogin } from './MyLogin'
import { Naver } from './Naver'
import { UserRepository } from './Repository/UserRepository'

export type LoginType = 'google' | 'kakao' | 'naver' | 'my'

export class Login {
	static getInstance(type: LoginType, id: string, pw: string) {
		switch (type) {
			case 'google':
				return new Google(id, pw)
			case 'kakao':
				return new Kakao(id, pw)
			case 'naver':
				return new Naver(id, pw)
			default:
				return new MyLogin(id, pw)
		}
	}
}

export class LoginNew {
	constructor(
		private readonly userRepository: UserRepository
	) {
	}

	getLogin(type: LoginType, id: string, pw: string) {
		switch (type) {
			case 'google':
				return new GoogleNew(id, pw, (success, failure) => {
					const user = this.userRepository.findOne(id, pw)
					if (!user) failure()
					success(user)
				})
			case 'kakao':
				return new KakaoNew(id, pw, (success, failure) => {
					const user = this.userRepository.findOne(id, pw)
					if (user) failure(5)
					success(user)
				})
			case 'naver':
				return new Naver(id, pw)
			default:
				return new MyLogin(id, pw)
		}
	}
}
