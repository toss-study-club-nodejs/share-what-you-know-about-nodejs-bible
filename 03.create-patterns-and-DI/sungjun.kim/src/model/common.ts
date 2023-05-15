export type Executor = (o?: any) => void

export abstract class BasicLogin {
	abstract getId(): string

	abstract getName(): string

	login() {
		return `${this.getName()}(${this.getId()}) Login Success.`
	}
}

export abstract class BasicLoginNew {
	abstract getInfo(): string

	abstract getName(): string

	abstract maskingPw(): void

	login(date?: string) {
		return `[System: ${date ?? ''}] ${this.getName()}(${this.getInfo()}) Login Success.`
	}

	loginFail(count: number) {
		return `[System: ${new Date().toDateString()}] Login Failed ${count} times. You've got locked.`
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
