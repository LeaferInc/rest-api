import { Controller, Post, Body, Request, UseGuards, Get, Put, Delete, Param, Query } from '@nestjs/common';
import { CreateCuttingDto, UpdateCuttingDto } from 'src/common/dto/cutting.dto';
import { CuttingService } from './cutting.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('cuttings')
@UseGuards(JwtAuthGuard)
export class CuttingController {

  constructor(private readonly cuttingService: CuttingService) {}

  @Post()
  create(@Request() req: Express.Request, @Body() createCuttingDto: CreateCuttingDto) {
    return this.cuttingService.create(createCuttingDto, req.user.userId);
  }

  @Get('my')
  findAllByUser(@Request() request: Express.Request, @Query('skip') skip: number, @Query('take') take: number) {
    return this.cuttingService.findAllByUser(request.user, {skip, take});
  }

  @Get('exchange')
  findAllExceptOwner(@Request() request: Express.Request, @Query('skip') skip: number, @Query('take') take: number) {
    return this.cuttingService.findAllExceptOwner(request.user, {skip, take});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuttingService.findOne(Number(id));
  }

  @Put()
  edit(@Request() req: Express.Request, @Body() updateCuttingDto: UpdateCuttingDto) {
    console.log(updateCuttingDto);
    return this.cuttingService.edit(updateCuttingDto);
  }

  @Delete(':id')
  delete(@Request() req: Express.Request, @Param('id') id: string) {
    return this.cuttingService.delete(id);
  }
}
