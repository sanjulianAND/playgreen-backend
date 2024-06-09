import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { TransactionService } from '../../transactions/transaction.service';
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

  constructor(
    private readonly userService: UserService,
    private readonly transactionService: TransactionService,
  ) {}

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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user data' })
  @ApiResponse({ status: 200, description: 'User updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: CreateUserDto) {
    this.logger.log(`Updating user with ID: ${id}`);
    const user = await this.userService.update(id, updateUserDto);
    if (user) {
      this.logger.log(`User updated with ID: ${id}`);
    } else {
      this.logger.warn(`User not found with ID: ${id}`);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user balance' })
  @ApiResponse({ status: 200, description: 'User balance retrieved' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id/balance')
  async getBalance(@Param('id') id: number) {
    this.logger.log(`Fetching balance for user with ID: ${id}`);
    const balance = await this.transactionService.calculateBalance(id);
    return { balance };
  }
}
