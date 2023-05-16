import { Module } from '@nestjs/common'
import { MessageService } from './message.service'
import { SmsService } from './sms.service'
import { EmailService } from './email.service'
import { MessageController } from './message.controller'

@Module({
	controllers: [ MessageController ],
	providers: [ MessageService, SmsService, EmailService ],
})
export class MessageModule {}
