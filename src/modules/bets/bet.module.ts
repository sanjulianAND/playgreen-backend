import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BetController } from './controllers/bet.controller';
import { BetService } from './bet.service';
import { Bet } from './entities/bet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bet])],
  controllers: [BetController],
  providers: [BetService],
  exports: [BetService],
})
export class BetModule {}
