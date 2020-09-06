import { Controller, Post, Body, Get, Delete, Param, Request, UseGuards, Query, Put, BadRequestException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from 'src/common/dto/user.dto';
import { UserService } from './user.service';
import { UserEntity } from 'src/common/entity/user.entity';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { ResultData } from 'src/common/dto/query.dto';
import { AppTime } from 'src/common/app.time';

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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findMe(@Request() req: Express.Request): Promise<UserDto> {
    return (await this.userService.findOneById(req.user.userId)).toDto();
  }

  /**
   * @param id the userId
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOneById(id);
  }

  /**
   * Update a user
   * @param req the request containing the token
   * @param updateUserDto the fields to update
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  async update(@Request() req: Express.Request, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    if (updateUserDto.birthdate != null && new Date(updateUserDto.birthdate) >= AppTime.now()) {
      throw new BadRequestException('`birthdate` cannot be in the future');
    }
    return (await this.userService.update(req.user.userId, updateUserDto)).toDto();
  }

  /**
   * Delete a user
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Request() req: Express.Request, @Param('id') id: string): Promise<DeleteResult> {
    return this.userService.removeById(id);
  }
}
