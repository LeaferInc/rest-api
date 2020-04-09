import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthentificationService {

  constructor(private userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if(user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
