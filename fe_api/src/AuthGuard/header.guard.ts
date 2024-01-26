import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HeaderAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    const token = headers.authorization;
    if (!token) {
      return false;
    }
    try {
      this.jwtService.decode(token);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
