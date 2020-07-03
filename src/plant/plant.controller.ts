import { Controller, Post, Body, Get, Param, Delete, Request, UseGuards, Query } from '@nestjs/common';
import { PlantService } from './plant.service';
import { CreatePlantDto } from 'src/common/dto/plant.dto';
import { PlantEntity } from 'src/common/entity/plant.entity';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResultData } from 'src/common/dto/query.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';

@ApiBearerAuth()
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

  @Get('my')
  findAllByUser(@Request() request: Express.Request, @Query('skip') skip: number, @Query('take') take: number) {
    return this.plantService.findAllByByUser(request.user, {skip, take});
  }

  @Get('findAllExceptOwner')
  findAllExceptOwner(@Request() req: Express.Request, @Query('skip') skip: number, @Query('take') take: number): Promise<ResultData<PlantEntity>> {
    return this.plantService.findAllExceptOwner(req.user, {skip, take});
  }

  @Get('my-garden')
  findAllMyGarden(@Request() req: Express.Request, @Query('skip') skip: number, @Query('take') take: number): Promise<ResultData<PlantEntity>> {
    return this.plantService.findAllMyGarden(req.user, {skip, take});
  }

  @Get('all')
  @UseGuards(AdminGuard)
  findAll(@Query('skip') skip: number, @Query('take') take: number) {
    return this.plantService.findAll({skip, take});
  }

  /**
   * @param criteria is the plantId or the name
   */
  @Delete(':id')
  remove(@Request() req: Express.Request, @Param('id') id: string): Promise<DeleteResult> {
    return this.plantService.remove(id);
  }

}
