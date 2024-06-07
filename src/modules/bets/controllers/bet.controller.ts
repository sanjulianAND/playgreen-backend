import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { BetService } from '../bet.service';
import { CreateBetDto } from '../dto/create-bet.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('bets')
@Controller('bets')
export class BetController {
  private readonly logger = new Logger(BetController.name);

  constructor(private readonly betService: BetService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new bet' })
  @ApiResponse({ status: 201, description: 'Bet created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  async create(@Body() createBetDto: CreateBetDto) {
    this.logger.log(`Creating bet with event ID: ${createBetDto.eventId}`);
    const bet = await this.betService.create(createBetDto);
    this.logger.log(`Bet created with ID: ${bet.id}`);
    return bet;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all bets' })
  @ApiResponse({ status: 200, description: 'Bets retrieved' })
  @Get()
  async findAll() {
    this.logger.log('Fetching all bets');
    const bets = await this.betService.findAll();
    this.logger.log(`Total bets found: ${bets.length}`);
    return bets;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get bet by ID' })
  @ApiResponse({ status: 200, description: 'Bet found' })
  @ApiResponse({ status: 404, description: 'Bet not found' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    this.logger.log(`Fetching bet with ID: ${id}`);
    const bet = await this.betService.findOneById(id);
    if (bet) {
      this.logger.log(`Bet found with ID: ${bet.id}`);
    } else {
      this.logger.warn(`Bet not found with ID: ${id}`);
    }
    return bet;
  }
}
