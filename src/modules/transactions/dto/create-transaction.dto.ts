import {
  IsDecimal,
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ description: 'The ID of the user making the transaction' })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'The amount of the transaction' })
  @IsDecimal()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    description: 'The category of the transaction',
    example: 'deposit',
  })
  @IsString()
  @IsNotEmpty()
  category: string; // deposit, withdraw, bet, winning

  @ApiProperty({ description: 'The status of the transaction' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: 'The ID of the related user bet, if applicable',
    required: false,
  })
  @IsInt()
  @IsOptional()
  userBetId?: number; // if bet or winning
}
