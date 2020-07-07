import { Controller, Post, Body, Get, Delete, Param, Request, UseGuards, Put } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from 'src/common/dto/user.dto';
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
    return (await this.userService.update(req.user.userId, updateUserDto)).toDto();
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
