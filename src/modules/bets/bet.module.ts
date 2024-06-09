import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetController } from './controllers/bet.controller';
import { BetService } from './bet.service';
import { Bet } from './entities/bet.entity';
import { UserBet } from '../user-bets/entities/user-bet.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { UserBetModule } from '../user-bets/user-bet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bet, UserBet, Transaction]),
    UserBetModule,
  ],
  providers: [BetService],
  controllers: [BetController],
  exports: [BetService],
})
export class BetModule {}
