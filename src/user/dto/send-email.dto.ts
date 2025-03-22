import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @IsEmail()
  @ApiProperty({ example: 'example@example.com' })
  email: string;
}
