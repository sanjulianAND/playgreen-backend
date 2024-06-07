import { IsDecimal, IsString, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserBetDto {
  @ApiProperty({ description: 'The ID of the user placing the bet' })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'The ID of the bet' })
  @IsInt()
  @IsNotEmpty()
  betId: number;

  @ApiProperty({ description: 'The odd of the bet' })
  @IsDecimal()
  @IsNotEmpty()
  odd: number;

  @ApiProperty({ description: 'The amount of the bet' })
  @IsDecimal()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ description: 'The state of the bet', example: 'open' })
  @IsString()
  @IsNotEmpty()
  state: string; // open, won, lost
}
