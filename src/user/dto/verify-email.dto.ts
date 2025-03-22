import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyEmailDto {
  @IsEmail()
  @ApiProperty({ example: 'zergskybmw@naver.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '0000' })
  code: string;
}