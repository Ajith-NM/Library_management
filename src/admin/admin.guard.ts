import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('secret'),
      });
      console.log('tryed', payload);
      if (payload.role !== 'admin') {
        console.log('cannot access');
        throw new UnauthorizedException('Insufficient permissions');
      }
      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('your token is expired');
      } else {
        throw new UnauthorizedException(error.message);
      }
    }
  }
  private extractTokenFromHeader(request: any): string | undefined {
    const token = request.headers.authorization?.split(' ')[1];
    return token;
  }
}
