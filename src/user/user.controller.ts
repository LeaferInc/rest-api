import { Controller, Post, Body, Get, Delete, Param, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/user.dto';
import { UserService } from './user.service';
import { UserEntity } from 'src/common/entity/user.entity';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get('talkto')
  @UseGuards(JwtAuthGuard)
  getTalkTo(@Request() req: Express.Request): Promise<UserEntity[]> {
    return this.userService.getTalkTo(req.user.userId);
  }

  /**
   * @param criteria is the userId or the username
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOneById(id);
  }

  /**
   * @param criteria is the userId or the username
   */
  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Request() req: Express.Request): Promise<DeleteResult> {
    return this.userService.removeById(req.user.userId);
  }
}
