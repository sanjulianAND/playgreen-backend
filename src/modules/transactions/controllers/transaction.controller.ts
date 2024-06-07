import {
  Controller,
  Get,
  Param,
  Post,
  Body,
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
      `Creating transaction for user ID: ${createTransactionDto.userId}`,
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
}
