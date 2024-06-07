import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('bets')
export class Bet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  betOption: string;

  @Column({ length: 255 })
  sport: string;

  @Column({ length: 50 })
  status: string; // active, cancelled, settled

  @Column({ length: 255 })
  name: string;

  @Column()
  eventId: number;

  @Column('decimal')
  odd: number;

  @Column({ length: 50, nullable: true })
  result: string; // won, lost

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  deleted: boolean;

  @DeleteDateColumn()
  deletedAt: Date;
}
