import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  private getToken(headers: any): string {
    const [type, token] = headers.authorization?.split(' ');

    if (!(type === 'Bearer')) {
      throw new Error();
    }

    return token;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let token;
    try {
      token = this.getToken(request.headers);
    } catch (e) {
      throw new UnauthorizedException();
    }

    request['user'] = await this.jwtService
      .verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      })
      .catch(() => {
        throw new UnauthorizedException();
      });

    return true;
  }
}
