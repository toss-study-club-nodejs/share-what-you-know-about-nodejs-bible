export abstract class BasicLogin {
	abstract getId(): string
	abstract getName(): string

	login() {
		return `${this.getName()}(${this.getId()}) Login Success.`
	}
}
