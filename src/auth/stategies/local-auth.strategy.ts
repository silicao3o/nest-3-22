import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { User } from '../../user/entities/user.entity';

// 검증되는 함수
@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }
  // validate는 DTO형태가 못 들어감
  async validate(email: string, password: string): Promise<User> {
    return await this.authService.getAuthedUser({ email, password });
  }
}
