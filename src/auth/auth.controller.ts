import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './interfaces/requestWithUser';
import { ApiBody } from '@nestjs/swagger';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { SendEmailDto } from '../user/dto/send-email.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signupUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signupUser(createUserDto);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  async login(@Req() request: RequestWithUser) {
    return request.user;
  }

  @Post('/send-email')
  async sendEmail(@Body() sendEmailDto: SendEmailDto): Promise<void> {
    return await this.authService.emailVerify(sendEmailDto.email);
  }
}
