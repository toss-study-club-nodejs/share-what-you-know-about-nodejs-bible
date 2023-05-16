import { Repository } from './repository'
import { User } from './UserEntity'

export class UserRepository extends Repository {
	constructor() {
		super(new User())
	}

	findOne(id: string, pw: string) {
		return this.createQueryBuilder('u')
			.where('u.id = :id', { id })
			.andWhere('u.pw = :pw', { pw })
			.getOne()
	}
}
