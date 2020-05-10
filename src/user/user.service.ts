import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/common/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, FindManyOptions, ObjectID, FindConditions, FindOneOptions, getManager } from 'typeorm';
import { CreateUserDto } from 'src/common/dto/user.dto';

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
  create(userDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(userDto.toLowerCase());
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
    // TODO: refactor to typeorm syntax (GL HAVE FUN)
    return getManager()
      .query(
        "SELECT " +
        "   p.id, p.user_id as \"userId\", p.room_id as \"roomId\", u.created_at, u.enabled, u.id, u.email, u.username, u.firstname, " +
        "   u.lastname, u.birthdate, u.biography, u.location, u.picture_id as \"pictureId\" " +
        "FROM participants p " +
        "LEFT JOIN \"user\" u ON u.id = p.user_id " +
        "WHERE p.user_id != $1 AND p.room_id IN ( " +
        "   SELECT p.room_id " +
        "   FROM participants p " +
        "   WHERE p.user_id = $1 " +
        ");",
        [userId]
      );

      /** 
        SELECT u.id, u.email, u.username, u.firstname, u.lastname
        FROM users u
        LEFT JOIN messages m ON m."receiverId" = u.id
        WHERE m."senderId" = 3
        GROUP BY u.id

        UNION

        SELECT u.id, u.email, u.username, u.firstname, u.lastname
        FROM users u
        WHERE u.id IN (
          SELECT m."senderId"
          FROM users u
          LEFT JOIN messages m ON m."receiverId" = u.id
          WHERE m."receiverId" = 3
          GROUP BY m."senderId"
        );
       */
  }

  /**
   * Find the first occurence of an user
   * @param criteria is the userId or the username
   * @param options additional option for querying database
   */
  findOne(criteria: number | string, options?: FindOneOptions): Promise<UserEntity> {
    return typeof criteria == 'number' || Number(criteria)
      ? this.userRepository.findOne(criteria, options)
      : this.userRepository.findOne({ username: criteria }, options);
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
