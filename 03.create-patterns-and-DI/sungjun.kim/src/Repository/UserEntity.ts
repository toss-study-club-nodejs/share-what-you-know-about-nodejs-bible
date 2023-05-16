export abstract class Entity {
	abstract getTableName(): string
}

export class User extends Entity {
	public getTableName(): string {
		return this.constructor.name
	}
}
