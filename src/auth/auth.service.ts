import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
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
}
