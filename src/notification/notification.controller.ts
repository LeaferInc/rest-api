import { Controller, Get, Query, Request, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notification')
export class NotificationController {

  constructor(private readonly notificationService: NotificationService) {}

  @Get('my')
  getAllByUser(@Request() request: Express.Request, @Query('skip') skip: number, @Query('take') take: number) {
    return this.notificationService.findAllByUser(request.user, {skip, take});
  }
}
