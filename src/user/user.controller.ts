import { Controller, Post, Body, Get, Delete, Param, Request, UseGuards, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto, UpdateUserDto } from 'src/common/dto/user.dto';
import { UserService } from './user.service';
import { UserEntity } from 'src/common/entity/user.entity';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { File, fileFilter } from 'src/common/file';

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
  findMe(@Request() req: Express.Request): Promise<UserEntity> {
    return this.userService.findOneById(req.user.userId);
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
  @UseInterceptors(FileInterceptor('avatar', { fileFilter: fileFilter }))
  @Put()
  update(@Request() req: Express.Request, @Body() updateUserDto: UpdateUserDto, @UploadedFile() avatar: File): Promise<UserEntity> {
    return this.userService.update(req.user.userId, updateUserDto, avatar);
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
