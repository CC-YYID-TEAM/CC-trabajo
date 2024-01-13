import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    callback(state: string, code: string, scope: string, authuser: string, prompt: string): string;
}
