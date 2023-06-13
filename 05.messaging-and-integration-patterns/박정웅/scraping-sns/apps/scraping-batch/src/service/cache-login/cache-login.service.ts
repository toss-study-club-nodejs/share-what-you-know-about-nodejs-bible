import { LoginParam, LoginService, Session } from '@app/login/login.service';
import { Injectable, Logger, Optional } from '@nestjs/common';

@Injectable()
export class CacheLoginService implements LoginService {
  constructor(
    private readonly vendorLoginService: LoginService,
    @Optional() private readonly cache: Map<string, Session> = new Map(),
    @Optional()
    private readonly logger: Logger = new Logger(CacheLoginService.name),
  ) {}

  async login(param: LoginParam): Promise<Session> {
    this.logger.debug(`cache login [${param.id}]`);
    const cachedSession = this.cache.get(param.id);
    if (cachedSession != null) {
      return cachedSession;
    }
    const session = await this.vendorLoginService.login(param);
    this.cache.set(param.id, session);
    return session;
  }
}
