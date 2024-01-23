import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './job/job.module';
import { ConfigModule } from '@nestjs/config';
import { StatusJobModule } from './status-job/status-job.module';
import configuration from './config/configuration';

@Module({
  imports: [
    JobModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    StatusJobModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
