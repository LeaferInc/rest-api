import { Controller, Post, UseGuards, Request, Get, Body, Delete, Query, Param } from '@nestjs/common';
import { PlantCollectionService } from './plant-collection.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePlantCollectionDto, DeletePlantCollectionDto } from 'src/common/dto/plant-collection.dto';
import { get } from 'http';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('plant-collection')
export class PlantCollectionController {

  constructor(private readonly plantCollectionService: PlantCollectionService ) { }
  
  @Post()
  create(@Request() request: Express.Request, @Body() createPlantCollectionDto: CreatePlantCollectionDto) {
    return this.plantCollectionService.create(request.user.userId, createPlantCollectionDto.plantId);
  }

  @Get('findByPlantAndUser')
  findByPlantAndUser(@Request() request: Express.Request, @Query('id') plantId: number) {
    return this.plantCollectionService.findByPlantAndUser(request.user.userId, plantId);
  }

  @Delete(':id')
  deleteByPlantId(@Request() request: Express.Request, @Param('id') plantId: number) {
    return this.plantCollectionService.deleteByPlantId(plantId);
  }

}
