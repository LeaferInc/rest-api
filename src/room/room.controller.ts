import { Controller, Post, Get, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoomService } from './room.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('room')
@UseGuards(JwtAuthGuard)
export class RoomController {

  constructor(private roomService: RoomService) { }

}
