import { Controller, Post, Body, Request, UseGuards, Get, Put, Delete, Param, Query } from '@nestjs/common';
import { CreateCuttingDto, UpdateCuttingDto, CuttingDto } from 'src/common/dto/cutting.dto';
import { CuttingService } from './cutting.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResultData } from 'src/common/dto/query.dto';
import { DeleteResult } from 'typeorm';

@ApiBearerAuth()
@Controller('cuttings')
@UseGuards(JwtAuthGuard)
export class CuttingController {

  constructor(private readonly cuttingService: CuttingService) {}

  @Post()
  create(@Request() req: Express.Request, @Body() createCuttingDto: CreateCuttingDto): Promise<CuttingDto> {
    return this.cuttingService.create(createCuttingDto, req.user.userId);
  }

  @Get('my')
  findAllByUser(@Request() request: Express.Request, @Query('skip') skip: number, @Query('take') take: number): Promise<ResultData<CuttingDto>> {
    return this.cuttingService.findAllByUser(request.user, {skip, take});
  }

  @Get('exchange')
  findAllExceptOwner(@Request() request: Express.Request, @Query('skip') skip: number, @Query('take') take: number): Promise<ResultData<CuttingDto>> {
    return this.cuttingService.findAllExceptOwner(request.user, {skip, take});
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CuttingDto> {
    return this.cuttingService.findOne(Number(id));
  }

  @Put()
  edit(@Request() req: Express.Request, @Body() updateCuttingDto: UpdateCuttingDto): Promise<CuttingDto> {
    return this.cuttingService.edit(updateCuttingDto);
  }

  @Delete(':id')
  delete(@Request() req: Express.Request, @Param('id') id: string): Promise<DeleteResult> {
    return this.cuttingService.delete(id);
  }
}
