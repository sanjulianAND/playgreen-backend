import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bet } from './entities/bet.entity';
import { CreateBetDto } from './dto/create-bet.dto';

@Injectable()
export class BetService {
  constructor(
    @InjectRepository(Bet)
    private readonly betRepository: Repository<Bet>,
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
}
