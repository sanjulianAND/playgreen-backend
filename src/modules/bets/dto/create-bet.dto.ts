import {
  IsString,
  IsNotEmpty,
  IsDecimal,
  IsInt,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBetDto {
  @ApiProperty({ description: 'The bet option' })
  @IsString()
  @IsNotEmpty()
  bet_option: string;

  @ApiProperty({ description: 'The sport of the bet' })
  @IsString()
  @IsNotEmpty()
  sport: string;

  @ApiProperty({ description: 'The status of the bet', example: 'active' })
  @IsString()
  @IsNotEmpty()
  status: string; // active, cancelled, settled

  @ApiProperty({ description: 'The name of the bet' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The event ID of the bet' })
  @IsInt()
  @IsNotEmpty()
  event_id: number;

  @ApiProperty({ description: 'The odd of the bet' })
  @IsDecimal()
  @IsNotEmpty()
  odd: number;

  @ApiProperty({ description: 'The result of the bet', required: false })
  @IsString()
  @IsOptional()
  result?: string; // won, lost
}
