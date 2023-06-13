import { Module, OnApplicationBootstrap } from '@nestjs/common';
import * as zmq from 'zeromq';
import { ScrapingService } from './service/scraping.service';
import { ScrapingServiceModule } from './service/scraping-service.module';
import { SOCK_PULL_PUSH_BIND_ADDR } from '@app/common/constants';

@Module({ imports: [ScrapingServiceModule] })
export class ScrapingBatchModule implements OnApplicationBootstrap {
  constructor(private readonly scrapingService: ScrapingService) {}

  async onApplicationBootstrap() {
    const sock = zmq.socket('pull');
    sock.connect(SOCK_PULL_PUSH_BIND_ADDR);
    sock.on('message', (msg) => {
      this.scrapingService.scraping(msg.toString());
    });
  }
}
