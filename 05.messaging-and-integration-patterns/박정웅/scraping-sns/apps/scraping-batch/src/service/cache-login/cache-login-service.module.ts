import { Inject, Module } from '@nestjs/common';
import { CacheLoginService } from './cache-login.service';
import { InstagramLoginService } from '@app/instagram/instagram-login.service';
import { FacebookLoginService } from '@app/facebook/facebook-login.service';
import { loginServiceStrategyMap } from '@app/login/login-service-strategy';
import { LoginService } from '@app/login/login.service';

@Module({
  providers: [
    InstagramLoginService,
    FacebookLoginService,
    {
      inject: [InstagramLoginService],
      useFactory: (login) => new CacheLoginService(login),
      provide: 'INSTAGRAM',
    },
    {
      inject: [FacebookLoginService],
      useFactory: (login) => new CacheLoginService(login),
      provide: 'FACEBOOK',
    },
  ],
  exports: ['FACEBOOK', 'INSTAGRAM'],
})
export class CacheLoginServiceModule {
  constructor(
    @Inject('INSTAGRAM') private readonly instagram: LoginService,
    @Inject('FACEBOOK') private readonly facebook: LoginService,
  ) {
    loginServiceStrategyMap.set('instagram', this.instagram);
    loginServiceStrategyMap.set('facebook', this.facebook);
  }
}
