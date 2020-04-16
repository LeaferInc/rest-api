import { Controller, Post, Body, Get, Delete, Param, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto, UserDto } from 'src/common/dto/user.dto';
import { UserService } from './user.service';
import { UserEntity } from 'src/common/entity/user.entity';
import { DeleteResult } from 'typeorm';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(new CreateUserDto(createUserDto));
  }

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
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
