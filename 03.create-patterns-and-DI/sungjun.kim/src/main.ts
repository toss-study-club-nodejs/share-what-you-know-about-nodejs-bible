import { Google } from './Google'
import { Kakao } from './Kakao'
import { MyLogin } from './MyLogin'
import { Naver } from './Naver'

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
