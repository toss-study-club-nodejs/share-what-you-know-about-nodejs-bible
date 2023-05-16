export class Creation {
	private result: number
	constructor(count: number, executer: (success: (loop?: number) => void, fail: () => void) => void) {
		this.result = 0
		const cal = new Calculator(count)
		const success = (loop: number = 1) => {
			for(let i=0; i<loop; i++) {
				cal.increase()
			}
			this.result = cal.getTotal()
		}
		const fail = () => {
			cal.decrease()
			this.result = cal.getTotal()
		}
		executer(success, fail)
	}

	get Result() {
		return this.result
	}
}

class Calculator {
	constructor(private total: number) {
	}

	increase() {
		this.total++
	}

	decrease() {
		this.total--
	}

	getTotal() {
		return this.total
	}
}
