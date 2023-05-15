import { BasicLogin, BasicLoginNew, Executor } from './model/common'

export class Google extends BasicLogin {
	private readonly name: string

	constructor(
		private id: string,
		private pw: string
	) {
		super()
		this.name = `Google_${id}`
	}

	getId(): string {
		return this.id
	}

	getName(): string {
		return this.name
	}
}

export class GoogleNew extends BasicLoginNew {
	private name: string

	constructor(
		private id: string,
		private pw: string,
		executor: (success: Executor, failure: Executor) => void
	) {
		super()
		this.name = ''
		const loginSuccess = (obj: { name: string, level: number, job: string }) => {
			this.name = `Google_${obj.name}`
			this.id = `${obj.job} - Lv.${obj.level}`
			this.maskingPw()
			const msg = this.login(new Date().toDateString())
			console.info(msg)
		}
		const loginFailure = () => {
			// biz logic
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
