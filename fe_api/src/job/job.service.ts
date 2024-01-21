import { Injectable } from '@nestjs/common';
import { Server } from 'src/socket/server';
import { sendWorkDto } from './dto/sendWork';

@Injectable()
export class JobService {
  private server: Server;
  constructor() {
    this.server = new Server(
      `nats://${process.env.NATS_URL}`,
      `${process.env.NATS_PORT}`,
    );
  }
  sendWork(sendWork: sendWorkDto) {
    this.server.listener(sendWork);
  }
}
