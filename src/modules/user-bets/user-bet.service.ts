import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBet } from './entities/user-bet.entity';
import { CreateUserBetDto } from './dto/create-user-bet.dto';
import { BetService } from '../bets/bet.service';
import { TransactionService } from '../transactions/transaction.service';

@Injectable()
export class UserBetService {
  private readonly logger = new Logger(UserBetService.name);

  constructor(
    @InjectRepository(UserBet)
    private readonly userBetRepository: Repository<UserBet>,
    private readonly betService: BetService,
    private readonly transactionService: TransactionService,
  ) {}

  async create(createUserBetDto: CreateUserBetDto): Promise<UserBet> {
    this.logger.log(
      `Creating user bet with data: ${JSON.stringify(createUserBetDto)}`,
    );

    const bet = await this.betService.findOneById(createUserBetDto.bet_id);
    if (!bet) {
      throw new BadRequestException('Bet not found');
    }
    if (bet.status === 'cancelled' || bet.status === 'settled') {
      throw new BadRequestException(
        `Cannot place a bet on a ${bet.status} bet`,
      );
    }

    const userBalance = await this.transactionService.calculateBalance(
      createUserBetDto.user_id,
    );
    if (userBalance < createUserBetDto.amount) {
      throw new BadRequestException('Insufficient balance');
    }

    const userBet = this.userBetRepository.create(createUserBetDto);
    return await this.userBetRepository.save(userBet);
  }

  async findAll(): Promise<UserBet[]> {
    return await this.userBetRepository.find();
  }

  async findOneById(id: number): Promise<UserBet | undefined> {
    return (
      (await this.userBetRepository.findOne({ where: { id } })) || undefined
    );
  }
}
