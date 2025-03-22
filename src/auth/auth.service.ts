import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  async signupUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  async getAuthedUser(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;
    const findUser = await this.userService.getUserByEmail(email);
    const isPasswordMatched = await findUser.checkPassword(password);

    if (!isPasswordMatched) {
      throw new HttpException('Password Not Match', HttpStatus.BAD_REQUEST);
    }
    return findUser;
  }

  //send email(email verification)
  async emailVerify(email: string): Promise<void> {
    await this.emailService.sendEmail({
      to: email,
      subject: 'Elice Lab One Day Class - silica',
      html: `<h1>Welcome to Elice Lab One Day Class</h1>`,
    });
  }
}
