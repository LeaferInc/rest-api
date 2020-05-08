import { Controller, Post, Get, UseGuards, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoomService } from './room.service';

@Controller('room')
@UseGuards(JwtAuthGuard)
export class RoomController {

  constructor(private roomService: RoomService) { }
  
  @Post()
  create() {
    return this.roomService.create();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(Number(id));
  }

  @Get('/name/:name')
  findOneByName(@Param('name') name: string)  {
    return this.roomService.findOneByName(name);
  }
}
