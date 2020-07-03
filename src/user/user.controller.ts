import { Controller, Post, Body, Get, Delete, Param, Request, UseGuards, Query } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/user.dto';
import { UserService } from './user.service';
import { UserEntity } from 'src/common/entity/user.entity';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { ResultData } from 'src/common/dto/query.dto';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('all')
  findAll(@Query('skip') skip: number, @Query('take') take: number): Promise<ResultData<UserEntity>> {
    return this.userService.findAll({skip, take});
  }

  @ApiBearerAuth()
  @Get('talkto')
  @UseGuards(JwtAuthGuard)
  getTalkTo(@Request() req: Express.Request): Promise<UserEntity[]> {
    return this.userService.getTalkTo(req.user.userId);
  }

  /**
   * @param criteria is the userId or the username
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOneById(id);
  }

  /**
   * @param criteria is the userId or the username
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req: Express.Request, @Param('id') id: string): Promise<DeleteResult> {
    return this.userService.removeById(id);
  }
}
