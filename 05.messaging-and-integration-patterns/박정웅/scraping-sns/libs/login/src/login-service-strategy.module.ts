import { Module } from '@nestjs/common';
import { LoginServiceStrategy } from '@app/login/login-service-strategy';

@Module({
  providers: [LoginServiceStrategy],
  exports: [LoginServiceStrategy],
})
export class LoginServiceStrategyModule {}
