import { Injectable } from '@nestjs/common';
import { Server } from 'src/socket/server';
import { sendWorkDto } from './dto/sendWork';
import { v4 as uuid } from 'uuid';
import { responseDto } from './dto/response';
import { StatusJobService } from '../status-job/status-job.service';

@Injectable()
export class JobService {
  private server: Server;
  constructor(private readonly statusService: StatusJobService) {
    this.server = new Server(
      `nats://${process.env.NATS_URL}`,
      `${process.env.NATS_PORT}`,
    );
  }
  async sendWork(sendWork: sendWorkDto): Promise<responseDto> {
    const newIdTrabajo: string = uuid();

    sendWork.idTrabajo = newIdTrabajo;
    this.server.listener(sendWork);
    return new responseDto(newIdTrabajo);
  }
  async getJobById(_id: string): Promise<responseDto> {
    try {
      const response = await this.statusService.statusJobById(_id);
      console.log(response);
    } catch (err) {}
    const newIdTrabajo: string = uuid();
    return new responseDto(newIdTrabajo);
  }
}
