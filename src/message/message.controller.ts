import { Controller, Request, UseGuards, Post, Body, Get, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateMessageDto } from 'src/common/dto/message';
import { MessageService } from './message.service';

@Controller('message')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  create(@Request() req: Express.Request, @Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto, req.user.userId);
  }

  @Get('conversation')
  findConversation(@Request() req: Express.Request, @Query('receiverId') receiverId) {
    return this.messageService.findConversation(req.user.userId, receiverId)
  }
}
