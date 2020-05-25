import { Controller, Request, UseGuards, Post, Body, Get, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateMessageDto, CreateDiscussionMessageDto } from 'src/common/dto/message.dto';
import { MessageService } from './message.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('message')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  create(@Request() req: Express.Request, @Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto, req.user.userId);
  }

  @Post('createDiscussion')
  createDiscussion(@Request() req: Express.Request, @Body() createDiscussionMessageDto: CreateDiscussionMessageDto) {
    return this.messageService.createDiscussion(createDiscussionMessageDto, req.user.userId);
  }

  @Get('conversation')
  findConversation(@Request() req: Express.Request, @Query('roomId') roomId: number) {
    return this.messageService.findConversation(req.user.userId, roomId)
  }
}