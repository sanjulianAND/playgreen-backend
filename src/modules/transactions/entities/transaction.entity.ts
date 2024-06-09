import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int' })
  user_id: number;

  @Column('decimal')
  amount: number;

  @Column({ length: 50 })
  category: string; // deposit, withdraw, bet, winning

  @Column({ length: 50 })
  status: string;

  @Column({ name: 'user_bet_id', type: 'int', nullable: true })
  user_bet_id?: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ default: false })
  deleted: boolean;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;
}
