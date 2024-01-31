import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    const forwardedEmail = headers['x-forwarded-email'];
    const token = headers.authorization;
    if (!token) {
      return false;
    }
    if (forwardedEmail != process.env.USER_ADMIN) {
      return false;
    }
    return true;
  }
}
