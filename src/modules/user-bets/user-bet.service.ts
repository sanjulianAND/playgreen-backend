import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBet } from './entities/user-bet.entity';
import { CreateUserBetDto } from './dto/create-user-bet.dto';

@Injectable()
export class UserBetService {
  constructor(
    @InjectRepository(UserBet)
    private readonly userBetRepository: Repository<UserBet>,
  ) {}

  async create(createUserBetDto: CreateUserBetDto): Promise<UserBet> {
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

  async findByUserId(userId: number): Promise<UserBet[]> {
    return await this.userBetRepository.find({
      where: { user: { id: userId } },
    });
  }
}
