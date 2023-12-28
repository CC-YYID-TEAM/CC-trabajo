import { sendWorkDto } from './dto/sendWork';
export declare class AppService {
    private server;
    constructor();
    getHello(status: any, code: any, scope: any, authuser: any, prompt: any): string;
    sendWork(sendWork: sendWorkDto): void;
}
