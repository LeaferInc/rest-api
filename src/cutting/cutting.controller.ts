import { Controller, Post, Body, Request, UseGuards, Get, Put, Delete, Param } from '@nestjs/common';
import { CreateCuttingDto } from 'src/common/dto/cutting';
import { CuttingService } from './cutting.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('cutting')
@UseGuards(JwtAuthGuard)
export class CuttingController {

  constructor(private readonly cuttingService: CuttingService) {}

  @Post()
  create(@Request() req: Express.Request, @Body() createCuttingDto: CreateCuttingDto) {
    return this.cuttingService.create(createCuttingDto, req.user.userId);
  }

  @Get('my')
  findAllByUser(@Request() request: Express.Request) {
    return this.cuttingService.findAllByUser(request.user);
  }

  @Get('exchange')
  findAllExceptOwner(@Request() request: Express.Request) {
    return this.cuttingService.findAllExceptOwner(request.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuttingService.findOne(Number(id));
  }
}
