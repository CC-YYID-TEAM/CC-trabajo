import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('oauth2')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('callback')
  getHello(
    @Query('state') state: string,
    @Query('code') code: string,
    @Query('scope') scope: string,
    @Query('authuser') authuser: string,
    @Query('prompt') prompt: string): string {
    return this.appService.getHello(state,code,scope,authuser,prompt);
  }
}
