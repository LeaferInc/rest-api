import { Controller, UseGuards, Post, Body, Request, Put, Get, Query, Param } from '@nestjs/common';
import { SensorService } from './sensor.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateSensorDto } from 'src/common/dto/sensor.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sensor')
export class SensorController {

  constructor(private readonly sensorService: SensorService) { }

  @Post()
  create(@Request() request: Express.Request, @Body() sensorDto: CreateSensorDto) {
    return this.sensorService.create(sensorDto, request.user);
  }

  // @Put()
  // update(@Request() request: Express.Request, @Body() sensorDto: UpdateSensorDto) {
  //   return this.sensorService.update(sensorDto, request.user);
  // }

  @Get('findByCollectionId')
  findByPlantCollection(@Request() request: Express.Request, @Query('plantCollectionId') plantCollectionId: number) {
    return this.sensorService.getSensorByPlantCollectionId(request.user.userId, plantCollectionId);
  }

  @Put('desync/:sensorId')
  desyncSensor(@Request() request: Express.Request, @Param('sensorId') sensorId: number) {
    return this.sensorService.desync(sensorId);
  }

}
