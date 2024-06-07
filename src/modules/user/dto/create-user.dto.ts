import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsDate,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The role of the user' })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({ description: 'The first name of the user' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'The last name of the user' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'The phone number of the user' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'The username of the user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'The address of the user' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'The gender of the user' })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ description: 'The birth date of the user' })
  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty({ description: 'The country ID of the user' })
  @IsInt()
  @IsNotEmpty()
  countryId: number;

  @ApiProperty({ description: 'The city of the user' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'The category of the user', required: false })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiProperty({ description: 'The document ID of the user', required: false })
  @IsString()
  @IsOptional()
  documentId?: string;

  @ApiProperty({ description: 'The state of the user' })
  @IsString()
  @IsNotEmpty()
  userState: string;
}
