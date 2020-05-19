import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { WsException } from '@nestjs/websockets';
import { UserService } from 'src/user/user.service';

@Injectable()
export class WsJwtGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    
    const token = context.switchToWs().getClient().handshake.headers.authorization.split(' ')[1];
    
    if(!token) {
      throw new WsException('Missing jwt token');
    }

    try {
      const decoded = this.jwtService.verify(token);

      const user = await this.userService.findOneById(decoded.sub);

      if(!user) throw new WsException('User not found');

      return true;
    } catch(err) {
      throw new WsException(err)
    }
  }
}
