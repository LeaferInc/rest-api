import { Controller, UseGuards, Post, Get, Body, Request, Param, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from 'src/common/dto/participant.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('participant')
@UseGuards(JwtAuthGuard)
export class ParticipantController {

  constructor(private participantService: ParticipantService) { }

}
