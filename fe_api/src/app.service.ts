import { Injectable } from '@nestjs/common';
import { Socket } from './socket/zeromq';

@Injectable()
export class AppService {
  private socket:Socket
  constructor(){
    this.socket = new Socket("tcp://127.0.0.1:5555","push")
  }
  getHello(
    status:any,
    code:any,
    scope:any,
    authuser:any,
    prompt:any): string {
    return 'status: '+status+", code: "+code+", scope: "+scope+", authuser: "+authuser +", prompt:"+prompt;
  }
  sendWork(){
    this.socket.sendMessage();
  }
}
