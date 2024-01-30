import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { sendWorkDto } from './dto/sendWork';
import { ApiTags } from '@nestjs/swagger';
import { responseDto } from './dto/response';
import { HeaderAuthGuard } from 'src/AuthGuard/header.guard';

@Controller('job')
@ApiTags('job')
export class JobController {
  constructor(private readonly appService: JobService) {}
  @Post('sendWork')
  async sendWork(
    @Headers() headers,
    @Body() sendWork: sendWorkDto,
  ): Promise<responseDto> {
    const forwardedEmail = headers['x-forwarded-email'];
    console.log('cabecera', headers);
    console.log('email', forwardedEmail);
    return this.appService.sendWork(sendWork, 'forwardedEmail');
  }
  //@UseGuards(HeaderAuthGuard)
  @Get('statusJob/:id')
  async getJobStatusById(@Param('id') id: string, @Headers() headers) {
    const forwardedEmail = headers['x-forwarded-email'];
    console.log('cabecera', headers);
    console.log('email', forwardedEmail);
    console.log('already returned ');
    return await this.appService.getJobStatusById(id);
  }

  @Get('resultJob/:id')
  async getJobResultByUser(@Param('id') id: string, @Headers() headers) {
    const forwardedEmail = headers['x-forwarded-email'];
    console.log('cabecera', headers);
    console.log('email', forwardedEmail);
    console.log('already returned ');
    return await this.appService.getJobResultByUser(id, 'forwardedEmail');
  }

  @Get('')
  async getAllJob(@Headers() headers) {
    const forwardedEmail = headers['x-forwarded-email'];
    console.log('cabecera', headers);
    console.log('email', forwardedEmail);
    return await this.appService.getAllJobByUser('forwardedEmail');
  }

  @Get('metricas')
  async getMetricas() {
    console.log('already returned ');
    return await this.appService.getMetricas();
  }
}
