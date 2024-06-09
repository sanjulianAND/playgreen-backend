import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { TransactionService } from '../transaction.service';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Role } from 'src/modules/auth/role.enum';
import { Roles } from 'src/modules/auth/roles.decorator';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionController {
  private readonly logger = new Logger(TransactionController.name);

  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({ status: 201, description: 'Transaction created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    this.logger.log(
      `Creating transaction for user ID: ${createTransactionDto.user_id}`,
    );
    const transaction =
      await this.transactionService.create(createTransactionDto);
    this.logger.log(`Transaction created with ID: ${transaction.id}`);
    return transaction;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 200, description: 'Transactions retrieved' })
  @Get()
  async findAll() {
    this.logger.log('Fetching all transactions');
    const transactions = await this.transactionService.findAll();
    this.logger.log(`Total transactions found: ${transactions.length}`);
    return transactions;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all transactions filtered by user or category',
  })
  @ApiResponse({ status: 200, description: 'Transactions retrieved' })
  @Get('filter')
  async findAllFiltered(
    @Query('user_id') user_id?: number,
    @Query('category') category?: string,
  ) {
    this.logger.log(
      `Fetching transactions filtered by user_id: ${user_id} or category: ${category}`,
    );
    const transactions = await this.transactionService.findAllFiltered(
      user_id,
      category,
    );
    return transactions;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiResponse({ status: 200, description: 'Transaction found' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    this.logger.log(`Fetching transaction with ID: ${id}`);
    const transaction = await this.transactionService.findOneById(id);
    if (transaction) {
      this.logger.log(`Transaction found with ID: ${transaction.id}`);
    } else {
      this.logger.warn(`Transaction not found with ID: ${id}`);
    }
    return transaction;
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get transactions by type' })
  @ApiResponse({ status: 200, description: 'Transactions retrieved' })
  @Get()
  async findByType(@Query('type') type: string) {
    this.logger.log(`Fetching transactions of type: ${type}`);
    const transactions = await this.transactionService.findByType(type);
    return transactions;
  }
}
