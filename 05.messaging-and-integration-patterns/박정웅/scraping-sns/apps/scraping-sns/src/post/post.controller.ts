import {
  Controller,
  OnApplicationBootstrap,
  Param,
  Post,
} from '@nestjs/common';
import * as zmq from 'zeromq';
import { SOCK_PULL_PUSH_BIND_ADDR } from '@app/common/constants';
import { Vendor } from '@app/common/types';

@Controller('post')
export class PostController implements OnApplicationBootstrap {
  private sock!: zmq.Socket;

  @Post('scraping/:vendor/:id')
  async scraping(@Param('vendor') vendor: Vendor, @Param('id') id: string) {
    this.sock.send(`${vendor},${id},password`);
  }

  async onApplicationBootstrap() {
    this.sock = zmq.socket('push');
    await new Promise((resolve) => {
      this.sock.bind(SOCK_PULL_PUSH_BIND_ADDR, resolve);
    });
  }
}
