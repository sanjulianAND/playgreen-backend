import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Bet } from '../../bets/entities/bet.entity';

@Entity('user_bets')
export class UserBet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int' })
  user_id: number;

  @Column({ name: 'bet_id', type: 'int' })
  bet_id: number;

  @Column('decimal')
  odd: number;

  @Column('decimal')
  amount: number;

  @Column({ length: 50 })
  state: string; // open, won, lost

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ default: false })
  deleted: boolean;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
