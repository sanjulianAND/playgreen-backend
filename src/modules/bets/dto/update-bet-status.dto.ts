import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBetStatusDto {
  @ApiProperty({ description: 'The status of the bet', example: 'active' })
  @IsString()
  @IsNotEmpty()
  status: string; // active, cancelled
}
