import { LoginService } from '@app/login/login.service';
import { Vendor } from '@app/common/types';
import { Injectable } from '@nestjs/common';

export const loginServiceStrategyMap = new Map<Vendor, LoginService>();

@Injectable()
export class LoginServiceStrategy {
  get(vendor: Vendor): LoginService {
    return loginServiceStrategyMap.get(vendor);
  }
}
