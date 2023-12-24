import { Injectable } from '@nestjs/common';
import { Server } from './socket/server';

@Injectable()
export class AppService {
  private server: Server;
  constructor() {
    this.server = new Server('nats://localhost', '4222');
  }
  getHello(
    status: any,
    code: any,
    scope: any,
    authuser: any,
    prompt: any,
  ): string {
    return (
      'status: ' +
      status +
      ', code: ' +
      code +
      ', scope: ' +
      scope +
      ', authuser: ' +
      authuser +
      ', prompt:' +
      prompt
    );
  }
  sendWork() {
    this.server.listener();
  }
}
