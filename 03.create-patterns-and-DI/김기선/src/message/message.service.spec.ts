import { Test, TestingModule } from '@nestjs/testing'
import { MessageService } from './message.service'
import { MessageType } from './message.enum'
import { SmsService } from './sms.service'
import { EmailService } from './email.service'

describe('MessageService', () => {
	let messageService: MessageService

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [ MessageService, EmailService, SmsService ],
		}).compile()

		messageService = app.get<MessageService>(MessageService)
	})

	describe('instance check', () => {
		it('should return sms instance', () => {
			const sender = messageService.getSender(MessageType.SMS)
			expect(sender instanceof SmsService).toBe(true)
		})
		it('should return sms instance', () => {
			const sender = messageService.getSender(MessageType.EMAIL)
			expect(sender instanceof EmailService).toBe(true)
		})
	})
})
