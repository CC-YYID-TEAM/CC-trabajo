import { Module } from '@nestjs/common';
import { JobServiceApi } from './serviceapi_job.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [JobServiceApi],
})
export class JobApiModule {}
