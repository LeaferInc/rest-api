import { Controller, Post, Body, Get, Delete, Param, Request, UseGuards, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/common/dto/user.dto';
import { UserService } from './user.service';
import { UserEntity } from 'src/common/entity/user.entity';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @Get('talkto')
  @UseGuards(JwtAuthGuard)
  getTalkTo(@Request() req: Express.Request): Promise<UserEntity[]> {
    return this.userService.getTalkTo(req.user.userId);
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
  update(@Request() req: Express.Request, @Body() updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.userService.update(req.user.userId, updateUserDto);
  }

  /**
   * Delete a user
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Request() req: Express.Request): Promise<DeleteResult> {
    return this.userService.removeById(req.user.userId);
  }
}
