import { AppService } from './app.service';
import { sendWorkDto } from './dto/sendWork';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    callback(state: string, code: string, scope: string, authuser: string, prompt: string): string;
    sendWork(sendWork: sendWorkDto): Promise<void>;
}
