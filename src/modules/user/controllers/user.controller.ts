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
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { Role } from '../../auth/role.enum';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async findOne(@Param('username') username: string) {
    this.logger.log(`Fetching user with username: ${username}`);
    const user = await this.userService.findOneByUsername(username);
    if (user) {
      this.logger.log(`User found: ${user.username}`);
    } else {
      this.logger.warn(`User not found: ${username}`);
    }
    return user;
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`Creating user with username: ${createUserDto.username}`);
    const user = await this.userService.create(createUserDto);
    this.logger.log(`User created with ID: ${user.id}`);
    return user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async findAll() {
    this.logger.log('Fetching all users');
    const users = await this.userService.findAll();
    this.logger.log(`Total users found: ${users.length}`);
    return users;
  }

  @UseGuards(JwtAuthGuard)
  @Get('info/:id')
  async getUserInfo(@Param('id') id: number) {
    this.logger.log(`Fetching user info with ID: ${id}`);
    const user = await this.userService.findOneById(id);
    if (user) {
      this.logger.log(`User info found: ${user.username}`);
    } else {
      this.logger.warn(`User info not found for ID: ${id}`);
    }
    return user;
  }

  // Otros endpoints según sea necesario...
}
