import { QueryBuilder } from '../QueryBuilder'
import { Entity } from './UserEntity'

export class Repository {
	constructor(private entity: Entity) {
	}

	createQueryBuilder(alias?: string) {
		return new QueryBuilder(this.entity.getTableName())
			.createQueryBuilder(alias)
	}

	findAll() {
		return new QueryBuilder(this.entity.getTableName())
			.createQueryBuilder()
			.getMany()
	}
}

