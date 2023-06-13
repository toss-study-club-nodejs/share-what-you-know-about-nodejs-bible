import { Injectable, Logger, Optional } from '@nestjs/common';
import { ScrapingPostStrategy } from '@app/scraping-post/scraping-post-strategy';
import { LoginServiceStrategy } from '@app/login/login-service-strategy';
import { Vendor } from '@app/common/types';
import { bufferTime, filter, from, map, tap } from 'rxjs';
import { Post } from '@app/scraping-post/post-scraper';
import * as zmq from 'zeromq';
import { SOCK_PUB_SUB_BIND_ADDR } from '@app/common/constants';

@Injectable()
export class ScrapingService {
  private readonly sock = zmq.socket('pub');

  constructor(
    private readonly loginServiceStrategy: LoginServiceStrategy,
    private readonly scrapingPostStrategy: ScrapingPostStrategy,
    @Optional()
    private readonly logger: Logger = new Logger(ScrapingService.name),
  ) {
    this.sock.bindSync(SOCK_PUB_SUB_BIND_ADDR);
  }

  async scraping(commands: string) {
    const { vendor, id, password } = this.parsePayload(commands);
    await this.login(vendor, id, password);

    const now = new Date();
    this.getScrapingObs(vendor)
      .pipe(
        tap((post) => this.logger.debug(post)),
        filter((post) => post.date >= now),
        map(this.transformPost(vendor)),
        bufferTime(1000),
      )
      .subscribe(
        (data) => {
          this.sock.send(['scraping-post', JSON.stringify(data)]);
        },
        null,
        () => {
          this.sock.send([
            'scraping-post',
            JSON.stringify({ userId: id, flag: 'end' }),
          ]);
        },
      );
  }

  private getScrapingObs(vendor: Vendor) {
    return from(this.scrapingPostStrategy.get(vendor).getPost());
  }

  private async login(vendor: Vendor, id: string, password: string) {
    await this.loginServiceStrategy.get(vendor).login({ id, password });
  }

  private parsePayload(commands: string) {
    const [vendor, id, password] = commands.split(',');
    this.assertVendor(vendor);
    return { vendor, id, password };
  }

  private assertVendor(vendor: string): asserts vendor is Vendor {
    if (vendor !== 'instagram' && vendor !== 'facebook') {
      throw new Error('invalid vendor');
    }
  }

  private transformPost(vendor: Vendor) {
    const transformer = this.scrapingPostStrategy.getTransformer(vendor);
    return (post: Post) => transformer.transform(post);
  }
}
