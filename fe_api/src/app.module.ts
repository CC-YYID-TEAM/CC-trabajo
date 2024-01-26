import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './job/job.module';
import { ConfigModule } from '@nestjs/config';
import { StatusJobModule } from './status-job/status-job.module';
import configuration from './config/configuration';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JobModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    StatusJobModule,
    JwtModule.register({
      secret: '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', // Reemplaza con tu clave secreta
      signOptions: { expiresIn: '1h' }, // Puedes ajustar la expiración según tus necesidades
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
