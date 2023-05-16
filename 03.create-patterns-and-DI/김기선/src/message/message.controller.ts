import { Controller, Get, Inject, Query } from '@nestjs/common'
import { MessageService } from './message.service'
import { MessageType } from './message.enum'

@Controller('messages')
export class MessageController {

	@Inject()
	private readonly messageService: MessageService

	@Get()
	send(@Query() query: { type: MessageType }) {
		const sender = this.messageService.getSender(query.type)
		sender.send()
		return true
	}
}
