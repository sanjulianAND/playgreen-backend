import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBetController } from './controllers/user-bet.controller';
import { UserBetService } from './user-bet.service';
import { UserBet } from './entities/user-bet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserBet])],
  controllers: [UserBetController],
  providers: [UserBetService],
  exports: [UserBetService],
})
export class UserBetModule {}
