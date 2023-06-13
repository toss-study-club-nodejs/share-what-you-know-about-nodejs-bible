import { LoginService, Session } from '@app/login/login.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InstagramLoginService implements LoginService {
  async login(): Promise<Session> {
    return Promise.resolve(undefined);
  }
}
