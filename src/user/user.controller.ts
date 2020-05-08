import { Controller, Post, Body, Get, Delete, Param, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/common/dto/user.dto';
import { UserService } from './user.service';
import { UserEntity } from 'src/common/entity/user.entity';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

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
  @Get(':criteria')
  findOne(@Param('criteria') criteria: string): Promise<UserEntity> {
    return this.userService.findOne(criteria);
  }

  /**
   * @param criteria is the userId or the username
   */
  @Delete(':criteria')
  remove(@Param('criteria') criteria: string): Promise<DeleteResult> {
    return this.userService.remove(criteria);
  }
}
