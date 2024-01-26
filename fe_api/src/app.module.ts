import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './job/job.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { JobApiModule } from './service_job/serviceapi_job.module';

@Module({
  imports: [
    JobModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    JobApiModule,
    JwtModule.register({
      secret: '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', // Reemplaza con tu clave secreta
      signOptions: { expiresIn: '1h' }, // Puedes ajustar la expiración según tus necesidades
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
