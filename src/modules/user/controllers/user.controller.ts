import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by username' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':username')
  async findOne(@Param('username') username: string) {
    this.logger.log(`Fetching user with username: ${username}`);
    const user = await this.userService.findOneByUsername(username);
    if (user) {
      this.logger.log(`User found: ${user.username}`);
      return this.userService.sanitizeUser(user);
    } else {
      this.logger.warn(`User not found: ${username}`);
    }
    return user;
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`Creating user with username: ${createUserDto.username}`);
    const user = await this.userService.create(createUserDto);
    this.logger.log(`User created with ID: ${user.id}`);
    return this.userService.sanitizeUser(user);
  }
}
