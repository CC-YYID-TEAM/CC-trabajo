import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(
    status:any,
    code:any,
    scope:any,
    authuser:any,
    prompt:any): string {
    return 'status: '+status+", code: "+code+", scope: "+scope+", authuser: "+authuser +", prompt:"+prompt;
  }
}
