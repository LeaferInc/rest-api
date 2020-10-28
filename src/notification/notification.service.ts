import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateNotificationDto } from 'src/common/dto/notification.dto';
import { getManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/common/entity/user.entity';
import { Pagination } from 'src/common/dto/query.dto';
import { NotificationGateway } from './notification.gateway';
import { CronExpression, Cron } from '@nestjs/schedule';
import * as firebase from 'firebase-admin';
import { SensorService } from 'src/sensor/sensor.service';
import { NotificationEntity, TypeNotification } from 'src/common/entity/notification.entity';
import { NotificationAlertEntity } from 'src/common/entity/notification-alert.entity';
import { NotificationMessageEntity } from 'src/common/entity/notification-message.entity';
import { nextTick } from 'process';
import { AppTime } from 'src/common/app.time';

@Injectable()
export class NotificationService implements OnModuleInit {

  private readonly logger = new Logger(NotificationService.name); 

  constructor(
    @InjectRepository(NotificationEntity) private readonly notificationRepository: Repository<NotificationEntity>,
    @InjectRepository(NotificationAlertEntity) private readonly notificationAlertRepository: Repository<NotificationAlertEntity>, 
    @InjectRepository(NotificationMessageEntity) private readonly notificationMessageRepository: Repository<NotificationMessageEntity>, 
    private userService: UserService,
    private sensorService: SensorService,
    private notificationGateway: NotificationGateway,
  ) { 
    // this.create({ content: 'Test Socket', notifier_id: 1 });
  }

  onModuleInit() {
    this.logger.log(`Starting initialisation of Firebase Admin ${firebase.SDK_VERSION}`);
    firebase.initializeApp({
      credential: firebase.credential.applicationDefault()
    });
    
    // firebase.messaging().sendToDevice(
    //   'c5IQgQqLR_6MJNSpj-VX2a:APA91bHy5HVIq1sEpXt-gwyqOhYPYJGYXX12GWUE1GRX59If6LqdMRP7uXUKJZrWHGSgy3CLAEC7tYpCOHsw18JVeyHm8qhG632iJv80lKrsXILEWDj0WXPcrE9kNTxUQltSBKVI_cnD',
    //   { 
    //     notification: {
    //       title: 'test',
    //       body: 'Un joli text'
    //     }
    //   }
    // ).then((data) => {
    //   this.logger.log(`[SEND] :`);
    //   this.logger.log(data);
    // }).catch((err) => {
    //   this.logger.error(`[SEND] : ${err}`);
    // })
  }

  async create(notificationDto: CreateNotificationDto): Promise<any> {
    const _notificationEntity = this.notificationRepository.create(notificationDto);

    const userEntity: UserEntity = await this.userService.findOneById(notificationDto.notifier_id);
  
    _notificationEntity.notifier = userEntity;

    const notificationEntity = await this.notificationRepository.save(_notificationEntity);
    this.notificationGateway.sendNotificaitons(notificationEntity);
    if(userEntity.fcmToken) {
      firebase.messaging().sendToDevice(userEntity.fcmToken, {
        notification: {
          title: notificationDto.title,
          body: notificationDto.content
        },
        data: {
          type_notification: notificationEntity.type.toString(),
        }
      });
    }

    return notificationEntity;
  }

  async findAllByUser(user: Express.User, pagination: Pagination) {
    const [items, count] = await this.notificationRepository.findAndCount({
      where: { notifier: { id: user.userId } },
      skip: pagination?.skip,
      take: pagination?.take,
      order: { createdAt: "DESC" }
    });
    return {items, count};
  }

  async readNotifications(notificationsId: number[]) {
    await this.notificationRepository.update(notificationsId, {read: true});
    return this.notificationRepository.findByIds(notificationsId, {
      order: { createdAt: "DESC" }
    });
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async triggerNotifications() {
    const sensorList = await this.sensorService.findAll();
    const res = await getManager().query(
    "WITH last_record_sensor AS( " +
    "  SELECT u.id as \"userId\", u.username as \"username\", p.id as \"plantId\", s.id as \"sensorId\", last_by_created_at.created_at " +
    "  FROM plant_collection pc " +
    "  INNER JOIN \"sensor\" s ON pc.id = s.plant_collection_id " +
    "  INNER JOIN \"plant\" p ON pc.plant_id = p.id " +
    "  INNER JOIN \"user\" u ON pc.user_id = u.id " +
    "  INNER JOIN ( " +
    "     SELECT sensor_id, MAX(created_at) as \"created_at\" " +
    "     FROM sensor_data " +
    "     GROUP BY sensor_id " +
    "  ) last_by_created_at ON s.id = last_by_created_at.sensor_id " +
    ") " +
    "SELECT s.\"id\" as id_sensor, s.\"plant_collection_id\", last_record_sensor.\"userId\", last_notif.\"created_at\" as last_notif_date, p.name as plant_name " +
    "FROM last_record_sensor " +
    "INNER JOIN \"plant\" p ON last_record_sensor.\"plantId\" = p.id " +
    "INNER JOIN \"sensor\" s ON last_record_sensor.\"sensorId\" = s.id " +
    "LEFT JOIN ( " +
    "  SELECT notifier_id, MAX(created_at) as \"created_at\" " +
    "  FROM notification " +
    "  WHERE type = 1 " +
    "  GROUP BY notifier_id " +
    ") last_notif ON last_record_sensor.\"userId\" = last_notif.notifier_id " +
    "INNER JOIN \"sensor_data\" sd ON ( " +
    "  sd.sensor_id = last_record_sensor.\"sensorId\" " +
    "  AND sd.created_at = last_record_sensor.created_at " +
    ") " +
    "WHERE " +
    "  humidity_min IS NOT NULL  " +
    "  AND humidity_max IS NOT NULL  " +
    "  AND ( " +
    "     ground_humidity < humidity_min " +
    "     OR ground_humidity > humidity_max " +
    "  ) " +
    "  AND s.enabled = true; "
    );
    res.forEach((element, index) => {
      const lastNotifDate = new Date(res[index]["last_notif_date"]);
      const maxDate = AppTime.now();
      maxDate.setMinutes(maxDate.getMinutes() - 5);
      if(lastNotifDate == null || lastNotifDate < maxDate){
        const notifContent = res[index]["plant_name"] + " a besoin d'attention !";
        const newNotif = new CreateNotificationDto();
        newNotif.title = "Alerte Plante";
        newNotif.content = notifContent;
        newNotif.href = "/plant/garden";
        newNotif.notifier_id = res[index]["userId"];
        newNotif.type = TypeNotification.PLANT_ALERT;
        this.create(newNotif);
      }
    });
  }
}
