import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetService } from './bet.service';
import { BetController } from './controllers/bet.controller';
import { Bet } from './entities/bet.entity';
import { UserBet } from '../user-bets/entities/user-bet.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { UserBetModule } from '../user-bets/user-bet.module';
import { TransactionModule } from '../transactions/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bet, UserBet, Transaction]),
    forwardRef(() => UserBetModule),
    forwardRef(() => TransactionModule),
  ],
  providers: [BetService],
  controllers: [BetController],
  exports: [BetService],
})
export class BetModule {}
