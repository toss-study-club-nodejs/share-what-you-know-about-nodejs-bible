import { BasicLogin, BasicLoginNew, Executor } from './model/common'

export class Kakao extends BasicLogin {
	private readonly name: string

	constructor(
		private id: string,
		private pw: string
	) {
		super()
		this.name = `Kakao_${id}`
	}

	getId(): string {
		return this.id
	}

	getName(): string {
		return this.name
	}
}

export class KakaoNew extends BasicLoginNew {
	private name: string

	constructor(
		private id: string,
		private pw: string,
		executor: (success: Executor, failure: Executor) => void
	) {
		super()
		this.name = ''
		const loginSuccess = (obj: { name: string, level: number, job: string }) => {
			this.name = `Kakao_${obj.name}`
			this.id = `${obj.job} - Lv.${obj.level}`
			this.maskingPw()
			const msg = this.login(new Date().toDateString())
			console.info(msg)
		}
		const loginFailure = (count: number) => {
			// biz logic
			const msg = this.loginFail(count)
			console.info(msg)
		}
		executor(loginSuccess, loginFailure)
	}

	getInfo(): string {
		return this.id
	}

	getName(): string {
		return this.name
	}

	maskingPw() {
		this.pw = '****'
	}
}
