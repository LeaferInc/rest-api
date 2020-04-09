import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/common/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CreateUserDto } from 'src/common/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  create(userDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(userDto);
    return this.userRepository.save(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  /**
   * Accept user id and username
   * @param id
   */
  findOne(id: number | string): Promise<UserEntity> {
    return typeof id == 'number' || Number(id)
      ? this.userRepository.findOne(id)
      : this.userRepository.findOne({ username: id });
  }

  remove(id: number | string): Promise<DeleteResult> {
    return typeof id == 'number' || Number(id)
      ? this.userRepository.delete(id)
      : this.userRepository.delete({ username: id });
  }
}
