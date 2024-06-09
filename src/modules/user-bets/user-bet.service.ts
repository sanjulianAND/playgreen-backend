import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBet } from './entities/user-bet.entity';
import { CreateUserBetDto } from './dto/create-user-bet.dto';

@Injectable()
export class UserBetService {
  private readonly logger = new Logger(UserBetService.name);

  constructor(
    @InjectRepository(UserBet)
    private readonly userBetRepository: Repository<UserBet>,
  ) {}

  async create(createUserBetDto: CreateUserBetDto): Promise<UserBet> {
    this.logger.log(
      `Creating user bet with data: ${JSON.stringify(createUserBetDto)}`,
    );
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
