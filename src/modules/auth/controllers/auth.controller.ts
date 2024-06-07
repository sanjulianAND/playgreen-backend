import {
  Controller,
  Post,
  UseGuards,
  Request,
  Logger,
  Get,
  Headers,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    this.logger.log(
      `AuthController login called for user: ${req.user.username}`,
    );
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('decode')
  decodeToken(@Headers('Authorization') authHeader: string) {
    const token = authHeader.split(' ')[1];
    const decoded = this.jwtService.decode(token);
    this.logger.log(`Decoded token: ${JSON.stringify(decoded)}`);
    return decoded;
  }
}
