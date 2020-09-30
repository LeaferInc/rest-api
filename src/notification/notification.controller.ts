import { Controller, Get, Query, Request, UseGuards, Post, Body, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateNotificationDto } from 'src/common/dto/notification.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notification')
export class NotificationController {

  constructor(private readonly notificationService: NotificationService) {}

  // TODO: Debug purpose only
  @Post()
  create(@Body() notificationDto: CreateNotificationDto) {
    return this.notificationService.create(notificationDto);
  }

  @Get('my')
  getAllByUser(@Request() request: Express.Request, @Query('skip') skip: number, @Query('take') take: number) {
    return this.notificationService.findAllByUser(request.user, {skip, take});
  }

  @Post('readNotifications')
  readNotifications(@Request() request: Express.Request, @Body() notificationsId: number[]) {
    return this.notificationService.readNotifications(notificationsId);
  }
}
