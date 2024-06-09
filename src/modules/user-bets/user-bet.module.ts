import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBetService } from './user-bet.service';
import { UserBetController } from './controllers/user-bet.controller';
import { UserBet } from './entities/user-bet.entity';
import { BetModule } from '../bets/bet.module';
import { TransactionModule } from '../transactions/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserBet]),
    forwardRef(() => BetModule),
    forwardRef(() => TransactionModule),
  ],
  providers: [UserBetService],
  controllers: [UserBetController],
  exports: [UserBetService],
})
export class UserBetModule {}
