import { Entity } from './Repository/UserEntity'

export class QueryBuilder {
	private isSelectAll: boolean
	private selectSql: string
	private fromSql: string
	private whereSql: string
	private parameters: any[]

	constructor(private tableName: string) {
		this.isSelectAll = true
		this.selectSql = ''
		this.fromSql = ''
		this.whereSql = ''
		this.parameters = []
	}

	createQueryBuilder(alias?: string) {
		this.fromSql += ` FROM ${this.tableName}`

		if (alias) {
			this.fromSql += ` ${alias}`
		}
		return this
	}

	select(column: string) {
		this.isSelectAll = false
		this.selectSql = `SELECT ${column}`
		return this
	}

	addSelect(column: string) {
		this.selectSql += `, ${column}`
		return this
	}

	where(condition: string, obj: { [key: string]: any }) {
		this.whereSql += ` WHERE ${condition}`
		this.parameters.push(...Object.values(obj))
		return this
	}

	andWhere(condition: string, obj: { [key: string]: any }) {
		this.whereSql += ` AND ${condition}`
		this.parameters.push(...Object.values(obj))
		return this
	}

	orWhere(condition: string, obj: { [key: string]: any }) {
		this.whereSql += ` OR ${condition}`
		this.parameters.push(...Object.values(obj))
		return this
	}

	getQuery() {
		if (this.isSelectAll) {
			this.selectSql = 'SELECT *'
		}

		const query = `${this.selectSql}${this.fromSql}${this.whereSql} -- [${this.parameters}]`
		return query.replace(/:\w+/g, '?')
	}

	getMany() {
		console.log(`[QueryRunner] ${this.getQuery()}`)
		return [{}]
	}

	getOne() {
		console.log(`[QueryRunner] ${this.getQuery()}`)
		return {
			name: 'ksj',
			level: 99,
			job: 'Knight'
		}
	}
}
