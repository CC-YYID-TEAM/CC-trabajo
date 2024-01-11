import { Body, Controller, Post } from '@nestjs/common';
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
    this.appService.sendWork(sendWork);
    return { id: '25' };
  }
}
