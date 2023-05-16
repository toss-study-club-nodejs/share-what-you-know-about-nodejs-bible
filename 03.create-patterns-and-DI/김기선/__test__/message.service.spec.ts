import { Test, TestingModule } from '@nestjs/testing'
import { MessageService } from '../src/message/message.service'
import { MessageType } from '../src/message/message.enum'
import { SmsService } from '../src/message/sms.service'
import { EmailService } from '../src/message/email.service'

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
