import { BasicLogin } from './model/common'

export class MyLogin extends BasicLogin {
	private readonly name: string

	constructor(
		private id: string,
		private pw: string
	) {
		super()
		this.name = `My_${id}`
	}

	getId(): string {
		return this.id
	}

	getName(): string {
		return this.name
	}
}
