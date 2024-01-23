import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { StatusJobService } from '../status-job/status-job.service';
import { StatusJobModule } from 'src/status-job/status-job.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [StatusJobModule, HttpModule],
  controllers: [JobController],
  providers: [JobService, StatusJobService],
})
export class JobModule {}
