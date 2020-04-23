import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/common/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, FindManyOptions, ObjectID, FindConditions, FindOneOptions } from 'typeorm';
import { CreateUserDto } from 'src/common/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /**
   * Create an user in the database from the corresponding CreateUserDto
   * @param userDto 
   */
  create(userDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(userDto.toLowerCase());
    return this.userRepository.save(user);
  }

  /**
   * Return many user based on the options
   * @param options 
   */
  findAll(options?: FindManyOptions<UserEntity>): Promise<UserEntity[]> {
    return this.userRepository.find(options);
  }

  /**
   * Find the first occurence of an user
   * @param criteria is the userId or the username
   */
  findOne(criteria: number | string): Promise<UserEntity> {
    return typeof criteria == 'number' || Number(criteria)
      ? this.userRepository.findOne(criteria)
      : this.userRepository.findOne({ username: criteria });
  }

  /**
   * Remove one or many user
   * @param criteria is the userId or the username
   */
  remove(criteria: number | string): Promise<DeleteResult> {
    return typeof criteria == 'number' || Number(criteria)
      ? this.userRepository.delete(criteria)
      : this.userRepository.delete({ username: criteria });
  }
}