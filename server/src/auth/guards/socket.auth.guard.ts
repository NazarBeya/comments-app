import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtPayload, decode } from 'jsonwebtoken';
import { Socket } from 'socket.io';

@Injectable()
export class WebSocketAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const socket: Socket = context.switchToWs().getClient();
    try {
      const token = socket.handshake.headers.authorization;
      console.log(token, 'socket token');
      if (!token) {
        throw new UnauthorizedException({ message: 'Unauthorized' });
      }
      const user = decode(token) as JwtPayload;
      if (!user) {
        throw new UnauthorizedException({ message: 'Unauthorized' });
      }

      socket.handshake.auth = user;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
