import { Injectable } from '@nestjs/common';
import * as zmq from 'zeromq';
import { SOCK_PUB_SUB_BIND_ADDR } from '@app/common/constants';
import { Subject } from 'rxjs';
import { TransformedPost } from '@app/scraping-post/post-transformer';

@Injectable()
export class ScrapingPostConsumerFactory {
  private readonly sock = zmq.socket('sub');

  constructor() {
    this.sock.connect(SOCK_PUB_SUB_BIND_ADDR);
    this.sock.subscribe('scraping-post');
  }

  create() {
    const sub = new Subject<
      TransformedPost[] | { userId: string; flag: 'end' }
    >();
    this.sock.on('message', (_, message) => {
      sub.next(JSON.parse(message.toString()));
    });
    return sub;
  }
}
