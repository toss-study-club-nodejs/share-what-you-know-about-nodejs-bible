import { Login, LoginType } from '../src/main'

describe('Creational Pattern', () => {
	describe('Factory', () => {
		it.each<[LoginType, string]>([
			['google', 'Google_ksj(ksj) Login Success.'],
			['kakao', 'Kakao_ksj(ksj) Login Success.'],
			['naver', 'Naver_ksj(ksj) Login Success.'],
			['my', 'My_ksj(ksj) Login Success.']
		])('%s Instance', (type, msg) => {
			const login = Login.getInstance(type, 'ksj', '1234').login()
			expect(login).toBe(msg)
		})
	})
})
