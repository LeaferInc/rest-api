import { Controller, UseGuards, Post, Get, Body, Request, Param, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from 'src/common/dto/participant.dto';

@Controller('participant')
@UseGuards(JwtAuthGuard)
export class ParticipantController {

  constructor(private participantService: ParticipantService) { }

  @Post()
  create(@Request() req: Express.Request, @Body() createParticipantDto: CreateParticipantDto) {
    if(!createParticipantDto.roomId) {
      throw new HttpException('RoomId not defined', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return this.participantService.create(createParticipantDto, req.user.userId);
  }

  @Post('withRoom')
  createWithRoom(@Request() req: Express.Request, @Body() usersId: number[]) {
    return this.participantService.createWithRoom(req.user.userId, ...usersId);
  }

  @Get('/user/:id')
  findByUserId(@Param('id') id: string) {
    return this.participantService.findByUserId(Number(id));
  }

  @Get('/room/:id')
  findByRoomId(@Param('id') id: string) {
    return this.participantService.findByRoomId(Number(id));
  }

}
