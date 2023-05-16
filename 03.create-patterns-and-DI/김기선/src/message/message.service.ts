import { Inject, Injectable } from '@nestjs/common'
import { EmailService } from './email.service'
import { SmsService } from './sms.service'
import { MessageType } from './message.enum'

@Injectable()
export class MessageService {
	constructor(

	) {}

	@Inject() private readonly emailService: EmailService
	@Inject() private readonly smsService: SmsService

	getSender(type: MessageType) {
		switch (type) {
			case MessageType.EMAIL:
				return this.emailService
			case MessageType.SMS:
				return this.smsService
		}
	}

}
