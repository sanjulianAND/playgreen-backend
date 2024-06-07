import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { UserBetService } from '../user-bet.service';
import { CreateUserBetDto } from '../dto/create-user-bet.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('user-bets')
@Controller('user-bets')
export class UserBetController {
  private readonly logger = new Logger(UserBetController.name);

  constructor(private readonly userBetService: UserBetService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user bet' })
  @ApiResponse({ status: 201, description: 'User bet created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  async create(@Body() createUserBetDto: CreateUserBetDto) {
    this.logger.log(
      `Creating user bet with user ID: ${createUserBetDto.userId}`,
    );
    const userBet = await this.userBetService.create(createUserBetDto);
    this.logger.log(`User bet created with ID: ${userBet.id}`);
    return userBet;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all user bets' })
  @ApiResponse({ status: 200, description: 'User bets retrieved' })
  @Get()
  async findAll() {
    this.logger.log('Fetching all user bets');
    const userBets = await this.userBetService.findAll();
    this.logger.log(`Total user bets found: ${userBets.length}`);
    return userBets;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user bet by ID' })
  @ApiResponse({ status: 200, description: 'User bet found' })
  @ApiResponse({ status: 404, description: 'User bet not found' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    this.logger.log(`Fetching user bet with ID: ${id}`);
    const userBet = await this.userBetService.findOneById(id);
    if (userBet) {
      this.logger.log(`User bet found with ID: ${userBet.id}`);
    } else {
      this.logger.warn(`User bet not found with ID: ${id}`);
    }
    return userBet;
  }
}
