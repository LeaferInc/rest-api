import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/common/dto/user.dto';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService) {}

  /**
   * Check if the user has the correct username and password
   * @param username 
   * @param password 
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username.toLowerCase());
    if(user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Function that create the jwt token with an username and an userId
   * @param user 
   */
  login(user): string {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async me(userId: number) {
    return this.userService.findOneById(userId);
  }
}
