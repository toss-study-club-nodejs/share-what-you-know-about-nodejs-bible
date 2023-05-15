export abstract class BasicLogin {
	abstract getId(): string

	abstract getName(): string

	login() {
		return `${this.getName()}(${this.getId()}) Login Success.`
	}
}

export class BasicResponse {
	id: number
	name: string
	age?: number
	tel?: string

	constructor(obj: { id: number, name: string }) {
		this.id = obj.id
		this.name = obj.name
	}

	setAge(age: number) {
		this.age = age
		return this
	}

	setTel() {
		this.tel = '01000000000'
		return this
	}
}
