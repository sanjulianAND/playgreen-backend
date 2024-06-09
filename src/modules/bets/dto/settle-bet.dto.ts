import { IsInt, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SettleBetDto {
  @ApiProperty({ description: 'The ID of the bet to settle' })
  @IsInt()
  @IsNotEmpty()
  bet_id: number;

  @ApiProperty({ description: 'The result of the bet', example: 'won' })
  @IsString()
  @IsNotEmpty()
  result: string;
}
