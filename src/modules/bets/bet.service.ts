import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet } from './entities/bet.entity';
import { CreateBetDto } from './dto/create-bet.dto';
import { UpdateBetStatusDto } from './dto/update-bet-status.dto';
import { SettleBetDto } from './dto/settle-bet.dto';
import { UserBet } from '../user-bets/entities/user-bet.entity';
import { Transaction } from '../transactions/entities/transaction.entity';

@Injectable()
export class BetService {
  constructor(
    @InjectRepository(Bet)
    private readonly betRepository: Repository<Bet>,
    @InjectRepository(UserBet)
    private readonly userBetRepository: Repository<UserBet>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(createBetDto: CreateBetDto): Promise<Bet> {
    const bet = this.betRepository.create(createBetDto);
    return await this.betRepository.save(bet);
  }

  async findAll(): Promise<Bet[]> {
    return await this.betRepository.find();
  }

  async findOneById(id: number): Promise<Bet | undefined> {
    return (await this.betRepository.findOne({ where: { id } })) || undefined;
  }

  async findBySport(sport: string): Promise<Bet[]> {
    return await this.betRepository.find({ where: { sport } });
  }

  async findAllFiltered(event_id?: number, sport?: string): Promise<Bet[]> {
    const where: any = {};
    if (event_id) where.event_id = event_id;
    if (sport) where.sport = sport;
    return await this.betRepository.find({ where });
  }

  async updateStatus(
    id: number,
    updateBetStatusDto: UpdateBetStatusDto,
  ): Promise<Bet | undefined> {
    const bet = await this.findOneById(id);
    if (bet) {
      bet.status = updateBetStatusDto.status;
      await this.betRepository.save(bet);
    }
    return bet;
  }

  async settleBet(settleBetDto: SettleBetDto): Promise<any> {
    const bet = await this.findOneById(settleBetDto.bet_id);
    if (!bet) {
      throw new NotFoundException(
        `Bet with ID ${settleBetDto.bet_id} not found`,
      );
    }

    bet.result = settleBetDto.result;
    bet.status = 'settled';
    await this.betRepository.save(bet);

    const messages = [];

    if (settleBetDto.result === 'won') {
      const userBets = await this.userBetRepository.find({
        where: { bet_id: settleBetDto.bet_id, state: 'open' },
      });
      const transactions: Transaction[] = [];

      for (const userBet of userBets) {
        userBet.state = 'won';
        await this.userBetRepository.save(userBet);

        const transaction = this.transactionRepository.create({
          user_id: userBet.user_id,
          amount: userBet.amount * userBet.odd,
          category: 'winning',
          status: 'completed',
          user_bet_id: userBet.id,
        });
        transactions.push(transaction);

        messages.push(`User ${userBet.user_id} won with bet ID: ${userBet.id}`);
      }

      await this.transactionRepository.save(transactions);
    } else if (settleBetDto.result === 'lost') {
      const userBets = await this.userBetRepository.find({
        where: { bet_id: settleBetDto.bet_id, state: 'open' },
      });

      for (const userBet of userBets) {
        userBet.state = 'lost';
        await this.userBetRepository.save(userBet);

        messages.push(
          `User ${userBet.user_id} lost with bet ID: ${userBet.id}`,
        );
      }
    } else {
      throw new InternalServerErrorException('Invalid result value');
    }

    return {
      message: `Bet with ID ${settleBetDto.bet_id} settled as ${settleBetDto.result}`,
      details: messages,
    };
  }
}
