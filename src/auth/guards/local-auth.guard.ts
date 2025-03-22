import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// 앞에서 한번 거치는 곳
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
