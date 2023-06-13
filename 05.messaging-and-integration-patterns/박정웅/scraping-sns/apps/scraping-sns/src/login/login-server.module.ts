import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginServiceStrategyModule } from '@app/login/login-service-strategy.module';

@Module({
  imports: [LoginServiceStrategyModule],
  controllers: [LoginController],
})
export class LoginServerModule {}
