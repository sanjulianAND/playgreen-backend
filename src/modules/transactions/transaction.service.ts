import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    if (
      ['bet', 'winning'].includes(createTransactionDto.category) &&
      !createTransactionDto.user_bet_id
    ) {
      throw new Error('user_bet_id is required for bet and winning categories');
    }
    const transaction = this.transactionRepository.create(createTransactionDto);
    return await this.transactionRepository.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }

  async findOneById(id: number): Promise<Transaction | undefined> {
    return (
      (await this.transactionRepository.findOne({ where: { id } })) || undefined
    );
  }

  async calculateBalance(user_id: number): Promise<number> {
    const transactions = await this.transactionRepository.find({
      where: { user_id },
    });
    let balance = 0;
    for (const transaction of transactions) {
      if (
        transaction.category === 'deposit' ||
        transaction.category === 'winning'
      ) {
        balance += Number(transaction.amount);
      } else if (
        transaction.category === 'withdraw' ||
        transaction.category === 'bet'
      ) {
        balance -= Number(transaction.amount);
      }
    }
    return balance;
  }

  async findByType(type: string): Promise<Transaction[]> {
    return await this.transactionRepository.find({ where: { category: type } });
  }

  async findAllFiltered(
    user_id?: number,
    category?: string,
  ): Promise<Transaction[]> {
    const where: any = {};
    if (user_id) where.user_id = user_id;
    if (category) where.category = category;
    return await this.transactionRepository.find({ where });
  }
}
