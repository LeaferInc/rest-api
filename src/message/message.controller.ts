import { Controller, Request, UseGuards, Post, Body, Get, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateMessageDto, CreateDiscussionMessageDto } from 'src/common/dto/message.dto';
import { MessageService } from './message.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MessageEntity } from 'src/common/entity/message.entity';
import { ImageService, ImageType } from 'src/image/image.service';

@ApiBearerAuth()
@Controller('message')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  async create(@Request() req: Express.Request, @Body() createMessageDto: CreateMessageDto): Promise<MessageEntity> {
    const msg = await this.messageService.create(createMessageDto, req.user.userId);
    msg.user['picture'] = ImageService.readFile(ImageType.AVATAR, msg.user.pictureId);
    return msg;
  }

  @Post('createDiscussion')
  async createDiscussion(@Request() req: Express.Request, @Body() createDiscussionMessageDto: CreateDiscussionMessageDto) {
    const msg = await this.messageService.createDiscussion(createDiscussionMessageDto, req.user.userId);
    msg.user['picture'] = ImageService.readFile(ImageType.AVATAR, msg.user.pictureId);
    return msg;
  }

  @Get('conversation')
  async findConversation(@Request() req: Express.Request, @Query('roomId') roomId: number) {
    return (await this.messageService.findConversation(req.user.userId, roomId))
    .map((m: MessageEntity) => {
      m.user['picture'] = ImageService.readFile(ImageType.AVATAR, m.user.pictureId);
      return m;
    });
  }
}
