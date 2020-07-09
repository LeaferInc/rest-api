import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PaymentService {

  constructor(
    private userService: UserService
  ) {}

  async webhookUpdateUser(userId: number) {
    if(userId && Number(userId)) {
      const userEntity = await this.userService.findOneById(userId);
      userEntity.premium = true;
      return this.userService.update(userId, userEntity);
    } else {
      throw new BadRequestException("User is undefined");
    }
  }
}
