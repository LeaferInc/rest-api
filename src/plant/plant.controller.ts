import { Controller, Post, Body, Get, Param, Delete, Request, UseGuards, Query } from '@nestjs/common';
import { PlantService } from './plant.service';
import { CreatePlantDto } from 'src/common/dto/plant.dto';
import { PlantEntity } from 'src/common/entity/plant.entity';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('plant')
export class PlantController {

  constructor(private readonly plantService: PlantService) { }

  @Post()
  create(@Request() request: Express.Request, @Body() createPlantDto: CreatePlantDto): Promise<PlantEntity> {
    return this.plantService.create(createPlantDto, request.user);
  }

  /**
   * @param criteria is the plantId or the name
   */
  @Get('one')
  findOne(@Query('criteria') criteria: string): Promise<PlantEntity> {
    return this.plantService.findOne(criteria);
  }

  @Get('search')
  findAllByCriteria(@Query('criteria') criteria: string): Promise<PlantEntity[]> {
    return this.plantService.findByCriteria(criteria);
  }

  @Get('my')
  findAllByUser(@Request() request: Express.Request) {
    return this.plantService.findAllByByUser(request.user);
  }

  @Get()
  findAll(): Promise<PlantEntity[]> {
    return this.plantService.findAll();
  }


  /**
   * @param criteria is the plantId or the name
   */
  @Delete(':criteria')
  remove(@Param('criteria') criteria: string): Promise<DeleteResult> {
    return this.plantService.remove(criteria);
  }

}
