import { Body, Controller, Param, Post } from '@nestjs/common';
import { LoginServiceStrategy } from '@app/login/login-service-strategy';
import { Vendor } from '@app/common/types';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginServiceStrategy: LoginServiceStrategy) {}

  @Post(':vendor')
  async login(@Body() credentials: LoginDto, @Param('vendor') vendor: Vendor) {
    const loginService = this.loginServiceStrategy.get(vendor);
    return loginService.login(credentials);
  }
}
