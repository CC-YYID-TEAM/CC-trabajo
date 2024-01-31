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
import { RoleAuthGuard } from 'src/AuthGuard/role.guard';

@Controller('job')
@ApiTags('job')
export class JobController {
  constructor(private readonly appService: JobService) {}
  @UseGuards(HeaderAuthGuard)
  @Post('sendWork')
  async sendWork(
    @Headers() headers,
    @Body() sendWork: sendWorkDto,
  ): Promise<responseDto> {
    const forwardedEmail = headers['x-forwarded-user'];
    console.log('cabecera', headers);
    console.log('email', forwardedEmail);
    return this.appService.sendWork(sendWork, forwardedEmail);
  }
  @UseGuards(HeaderAuthGuard)
  @Get('statusJob/:id')
  async getJobStatusById(@Param('id') id: string, @Headers() headers) {
    const forwardedEmail = headers['x-forwarded-email'];
    console.log('cabecera', headers);
    console.log('email', forwardedEmail);
    console.log('already returned ');
    return await this.appService.getJobStatusById(id);
  }
  @UseGuards(HeaderAuthGuard)
  @Get('resultJob/:id')
  async getJobResultByUser(@Param('id') id: string, @Headers() headers) {
    const forwardedEmail = headers['x-forwarded-user'];
    console.log('cabecera', headers);
    console.log('email', forwardedEmail);
    console.log('already returned ');
    return await this.appService.getJobResultByUser(id, forwardedEmail);
  }
  @UseGuards(HeaderAuthGuard)
  @Get('')
  async getAllJob(@Headers() headers) {
    const forwardedEmail = headers['x-forwarded-user'];
    console.log('cabecera', headers);
    console.log('email', forwardedEmail);
    return await this.appService.getAllJobByUser(forwardedEmail);
  }
  @UseGuards(RoleAuthGuard)
  @Get('metricas')
  async getMetricas() {
    console.log('get metricas');
    return await this.appService.getMetricas();
  }
}
