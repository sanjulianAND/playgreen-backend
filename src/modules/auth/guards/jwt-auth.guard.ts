import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      this.logger.warn(
        `JWT Auth Guard failed: ${info?.message || err?.message}`,
      );
      throw err || new UnauthorizedException();
    }
    this.logger.log(`JWT Auth Guard succeeded for user: ${user.username}`);
    return user;
  }
}
