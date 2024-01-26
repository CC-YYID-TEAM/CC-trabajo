import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { JobServiceApi } from '../service_job/serviceapi_job.service';
import { HttpModule } from '@nestjs/axios';
import { JwtService } from '@nestjs/jwt';
import { JobApiModule } from '../service_job/serviceapi_job.module';

@Module({
  imports: [JobApiModule, HttpModule],
  controllers: [JobController],
  providers: [JobService, JobServiceApi, JwtService],
})
export class JobModule {}
