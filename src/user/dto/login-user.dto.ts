import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({ example: 'example@example.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '1234' })
  password: string;
}