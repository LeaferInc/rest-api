import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/common/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, FindManyOptions, FindOneOptions, getManager } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from 'src/common/dto/user.dto';
import { ImageService, ImageType } from 'src/image/image.service';
import { File } from 'src/common/file';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private imageService: ImageService,
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

  /**
   * Return many user based on the options
   * @param options additional option for querying database
   */
  findAll(options?: FindManyOptions<UserEntity>): Promise<UserEntity[]> {
    return this.userRepository.find(options);
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
   * Returns a user's avatar
   * @param id the id of the user
   */
  async findAvatar(id: number): Promise<string> {
    const user: UserEntity = await this.userRepository.findOne(id);

    if (!user.pictureId) {
      throw new NotFoundException('Avatar not found');
    }

    const picture = ImageService.readFile(ImageType.AVATAR, user.pictureId);
    
    if (!picture) {
      throw new NotFoundException('Avatar not found');
    }

    return picture;
  }

  /**
   * Update a user
   * @param id the user to update
   * @param changes the fields to change
   */
  async update(id: number, changes: UpdateUserDto, avatar: File): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne(id);
    for (const key in changes) {
      user[key] = changes[key];
    }

    // Save image
    if (avatar) {
      if (user.pictureId) this.imageService.deleteFile(ImageType.AVATAR, user.pictureId);
      user.pictureId = this.imageService.saveFile(ImageType.AVATAR, user.username, avatar);
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
}
