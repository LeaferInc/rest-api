import { Body, Controller, Request, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateSensorDataDto } from 'src/common/dto/sensor-data.dto';
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

}
