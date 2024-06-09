import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserController } from './controllers/user.controller';
import { TransactionModule } from '../transactions/transaction.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TransactionModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
