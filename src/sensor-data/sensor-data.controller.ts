import { Body, Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateSensorDataDto } from 'src/common/dto/sensor-data.dto';
import { SensorDto } from 'src/common/dto/sensor.dto';
import { SensorEntity } from 'src/common/entity/sensor.entity';
import { SensorDataService } from './sensor-data.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sensor-data')
export class SensorDataController {

    constructor(private readonly sensorDataService: SensorDataService) { }

    @Post()
    create(@Request() request: Express.Request, @Body() sensorDataDto: CreateSensorDataDto) {
        return this.sensorDataService.create(sensorDataDto, request.user);
    }

    @Get('all')
    getDataById(@Request() request: Express.Request, @Body() sensorDto: SensorDto) {
        return this.sensorDataService.getDataFromId(sensorDto, request.user);
    }

    @Get('last')
    getLastDataById(@Request() request: Express.Request, @Body() sensor: SensorDto) {
        return this.sensorDataService.getLastDataFromId(sensor, request.user);
    }

}
