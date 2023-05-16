import { Injectable, Scope } from '@nestjs/common'
import { ISenderService } from './sender.interface'

@Injectable({ scope: Scope.REQUEST })
export class SmsService implements ISenderService {

	private readonly TIME = new Date()
	targets: string[] = []

	constructor() {
		console.log(this.TIME)
		console.log('smsService constructor')
		const seconds = new Date().getSeconds()
		this.targets = [ `sms_user${seconds}@gmail.com` ]
	}
	send(): void {
		console.log('targets : ', this.targets)
	}
}
