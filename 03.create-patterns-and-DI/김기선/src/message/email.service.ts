import { Injectable, Scope } from '@nestjs/common'
import { ISenderService } from './sender.interface'

@Injectable({ scope: Scope.REQUEST })
export class EmailService implements ISenderService {

	private readonly TIME = new Date()
	targets: string[] = []

	constructor() {
		console.log(this.TIME)
		console.log('emailService constructor')
		const seconds = new Date().getSeconds()
		this.targets = [ `email_user${seconds}@gmail.com` ]
	}

	send() {
		console.log('targets : ', this.targets)
	}

}
