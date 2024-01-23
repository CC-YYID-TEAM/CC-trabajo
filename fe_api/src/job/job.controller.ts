import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { JobService } from './job.service';
import { sendWorkDto } from './dto/sendWork';
import { ApiTags } from '@nestjs/swagger';
import { responseDto } from './dto/response';

@Controller('job')
@ApiTags('job')
export class JobController {
  constructor(private readonly appService: JobService) {}
  @Post('sendWork')
  async sendWork(@Body() sendWork: sendWorkDto): Promise<responseDto> {
    return this.appService.sendWork(sendWork);
  }
  @Get(':id')
  async getJobById(@Param('id') id: string) {
    console.log("already returned ")
    return this.appService.getJobById(id);
  }
}
