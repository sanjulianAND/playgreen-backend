import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { UserBet } from '../../user-bets/entities/user-bet.entity';

@Entity('bets')
export class Bet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  bet_option: string;

  @Column({ length: 255 })
  sport: string;

  @Column({ length: 50 })
  status: string; // active, cancelled, settled

  @Column({ length: 255 })
  name: string;

  @Column()
  event_id: number;

  @Column('decimal')
  odd: number;

  @Column({ length: 50, nullable: true })
  result: string; // won, lost

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ default: false })
  deleted: boolean;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
