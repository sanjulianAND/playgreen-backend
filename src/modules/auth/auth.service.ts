import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    this.logger.log(`Validating user: ${username}`);
    const user = await this.userService.findOneByUsername(username);
    if (user) {
      this.logger.log(`User found: ${user.username}`);
      if (user.password === pass) {
        this.logger.log(`Password is correct for user: ${user.username}`);
        const { password, ...result } = user;
        return result;
      } else {
        this.logger.warn(`Invalid password for user: ${user.username}`);
      }
    } else {
      this.logger.warn(`User not found: ${username}`);
    }
    return null;
  }

  async login(user: any) {
    this.logger.log(`Logging in user: ${user.username}`);
    const payload = {
      username: user.username,
      sub: user.userId,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    this.logger.log(
      `Generated JWT token for user: ${user.username}, token: ${token}`,
    );
    return {
      access_token: token,
    };
  }
}
