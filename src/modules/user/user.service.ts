import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByUsername(username: string): Promise<User | undefined> {
    return (
      (await this.userRepository.findOne({ where: { username } })) || undefined
    );
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async update(
    id: number,
    updateUserDto: CreateUserDto,
  ): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return undefined;
    }
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async findOneById(id: number): Promise<User | undefined> {
    return (await this.userRepository.findOne({ where: { id } })) || undefined;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async sanitizeUser(user: User): Promise<Partial<User>> {
    const { password, ...result } = user;
    return result;
  }
}
