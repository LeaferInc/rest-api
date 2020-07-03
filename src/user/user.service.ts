import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserEntity } from 'src/common/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, FindManyOptions, FindOneOptions, getManager } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from 'src/common/dto/user.dto';
import { Pagination, ResultData } from 'src/common/dto/query.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) { }

  /**
   * Create an user in the database from the corresponding CreateUserDto
   * @param userDto 
   */
  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(userDto.toLowerCase());

    const usersFound = await this.userRepository.find({
      where: [
        { username: user.username },
        { email: user.email }
      ]
    });

    if (usersFound.length) {
      throw new HttpException('User is already created with this username or email', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return this.userRepository.save(user);
  }

  async findAll(pagination?: Pagination): Promise<ResultData<UserEntity>> {
    const [items, count] = await this.userRepository.findAndCount({
      skip: pagination?.skip,
      take: pagination?.take,
      order: { createdAt: 'DESC' }
    });

    return {items, count};
  }

  getTalkTo(userId: number): Promise<UserEntity[]> {
    // TODO: refactor to typeorm syntax
    return getManager()
      .query(
        "SELECT " +
        "   p.id, p.user_id as \"userId\", p.room_id as \"roomId\", u.created_at, u.enabled, u.id, u.email, u.username, u.firstname, " +
        "   u.lastname, u.birthdate, u.biography, u.location, u.picture_id as \"pictureId\" " +
        "FROM participant p " +
        "LEFT JOIN \"user\" u ON u.id = p.user_id " +
        "WHERE p.user_id != $1 AND p.room_id IN ( " +
        "   SELECT p.room_id " +
        "   FROM participant p " +
        "   WHERE p.user_id = $1 " +
        ");",
        [userId]
      );
  }

  /**
   * Find the first occurence of an user by an id
   * @param id is the userId
   * @param options additional option for querying database
   */
  async findOneById(id: number, options?: FindOneOptions): Promise<UserEntity> {
    let userFound: UserEntity;
    try {
      userFound = await this.userRepository.findOneOrFail(id, options);
    } catch (err) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }

  /**
   * Find the first occurence of an user by an username
   * @param username is the username
   * @param options additional option for querying database
   */
  async findOneByUsername(username: string, options?: FindOneOptions): Promise<UserEntity> {
    let userFound: UserEntity;
    try {
      userFound = await this.userRepository.findOne({ username: username }, options)
    } catch (err) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return userFound;
  }

  /**
   * Update a user
   * @param id the user to update
   * @param changes the fields to change
   */
  async update(id: number, changes: UpdateUserDto): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne(id);
    for (const key in changes) {
      user[key] = changes[key];
    }

    return this.userRepository.save(user);
  }

  /**
   * Remove one user by id
   * @param id is the userId
   */
  removeById(id: number | string): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  userCount() {
    return this.userRepository.count();
  }
}
