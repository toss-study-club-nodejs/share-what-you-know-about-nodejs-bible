import { Login, LoginType } from '../src/main'
import { BasicResponse } from '../src/model/common'
import { Creation } from '../src/model/Creation'
import { QueryBuilder } from '../src/QueryBuilder'

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

	describe('Builder', () => {
		it('QueryBuilder', () => {
			const sql = new QueryBuilder('user')
				.createQueryBuilder('u')
				.where('u.id = :id', { id: 1 })
				.andWhere('u.name = :name', { name: 'ksj' })
				.getQuery()
			expect(sql).toBe('SELECT * FROM user u WHERE u.id = ? AND u.name = ? --[1,ksj]')
		})

		it('BasicResponse 1', () => {
			const res = new BasicResponse({ id: 1, name: 'ksj' })

			expect(res).toBeDefined()
			expect(res.id).toBe(1)
			expect(res.name).toBe('ksj')
			expect(res.age).not.toBeDefined()
			expect(res.tel).not.toBeDefined()
		})

		it('BasicResponse 2', () => {
			const res = new BasicResponse({ id: 1, name: 'ksj' })
				.setAge(20)
				.setTel()

			expect(res).toBeDefined()
			expect(res.id).toBe(1)
			expect(res.name).toBe('ksj')
			expect(res.age).toBe(20)
			expect(res.tel).toBe('01000000000')
		})
	})

	describe('Revealing Constructor', () => {
		it('[Success Loop 5] Calculator', () => {
			const n = new Creation(10, (success) => success(5))
			expect(n.Result).toBe(15)
		})

		it('[Success] Calculator', () => {
			const n = new Creation(10, (success) => success())
			expect(n.Result).toBe(11)
		})

		it('[Success] Calculator', () => {
			const n = new Creation(10, (success, fail) => {
				success()
				fail()
			})
			expect(n.Result).toBe(10)
		})

		it('[Success] Calculator', () => {
			const n = new Creation(10, (success, fail) => fail())
			expect(n.Result).toBe(9)
		})
	})
})
