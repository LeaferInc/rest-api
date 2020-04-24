import { Controller, UseInterceptors, ClassSerializerInterceptor, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { PlantService } from './plant.service';
import { CreatePlantDto } from 'src/common/dto/plant.dto';
import { PlantEntity } from 'src/common/entity/plant.entity';
import { DeleteResult } from 'typeorm';

@Controller('plant')
export class PlantController {

  constructor(private readonly plantService: PlantService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createPlantDto: CreatePlantDto): Promise<PlantEntity> {
    return this.plantService.create(createPlantDto);
  }

  @Get()
  findAll(): Promise<PlantEntity[]> {
    return this.plantService.findAll();
  }

  /**
   * @param criteria is the plantId or the name
   */
  @Get(':criteria')
  findOne(@Param('criteria') criteria: string): Promise<PlantEntity> {
    return this.plantService.findOne(criteria);
  }

  /**
   * @param criteria is the plantId or the name
   */
  @Delete(':criteria')
  remove(@Param('criteria') criteria: string): Promise<DeleteResult> {
    return this.plantService.remove(criteria);
  }

}
