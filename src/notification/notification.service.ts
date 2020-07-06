import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from 'src/common/dto/notification.dto';
import { NotificationEntity } from 'src/common/entity/notification.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/common/entity/user.entity';
import { Pagination } from 'src/common/dto/query.dto';
import { NotificationGateway } from './notification.gateway';

@Injectable()
export class NotificationService {

  constructor(
    @InjectRepository(NotificationEntity) private readonly notificationepository: Repository<NotificationEntity>, 
    private userService: UserService,
    private notificationGateway: NotificationGateway,
  ) { 
    // this.create({ content: 'Test Socket', notifier_id: 1 });
  }

  async create(notificationDto: CreateNotificationDto): Promise<any> {
    const _notificationEntity = this.notificationepository.create(notificationDto);

    const userEntity: UserEntity = await this.userService.findOneById(notificationDto.notifier_id);
  
    _notificationEntity.notifier = userEntity;

    const notificationEntity = await this.notificationepository.save(_notificationEntity);
    this.notificationGateway.sendNotificaitons(notificationEntity);

    return notificationEntity;
  }

  async findAllByUser(user: Express.User, pagination: Pagination) {
    const [items, count] = await this.notificationepository.findAndCount({
      where: { notifier: { id: user.userId } },
      skip: pagination?.skip,
      take: pagination?.take,
    });
    return {items, count};
  }

}
