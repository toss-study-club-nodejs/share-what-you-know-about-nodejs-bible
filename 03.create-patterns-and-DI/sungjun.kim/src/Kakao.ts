import { BasicLogin } from './model/common'

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
