import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { EmailService } from '../email/email.service';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { Cache } from 'cache-manager';
import { VerifyEmailDto } from '../user/dto/verify-email.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    @Inject(CACHE_MANAGER) private cacheManger: Cache,
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
    const generateNumber = this.generateOTP();

    await this.cacheManger.set(email, generateNumber);

    await this.emailService.sendEmail({
      to: email,
      subject: 'Elice Lab One Day Class - silica',
      html: `<h1>Welcome to Elice Lab One Day Class ${generateNumber}</h1>`,
    });
  }

  generateOTP() {
    let OTP = '';
    for (let i = 1; i < 6; i++) {
      OTP += Math.floor(Math.random() * 10);
    }
    return OTP;
  }

  async verifyCode(verifyEmailDto: VerifyEmailDto): Promise<boolean> {
    const { email, code } = verifyEmailDto;
    const emailCodeByRedis = await this.cacheManger.get(email);
    if (emailCodeByRedis !== code) {
      throw new BadRequestException('Wrong code Provided');
    }
    await this.cacheManger.del(email);
    return true;
  }
}
