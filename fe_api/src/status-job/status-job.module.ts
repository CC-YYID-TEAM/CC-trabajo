import { Module } from '@nestjs/common';
import { StatusJobService } from './status-job.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [StatusJobService],
})
export class StatusJobModule {}
