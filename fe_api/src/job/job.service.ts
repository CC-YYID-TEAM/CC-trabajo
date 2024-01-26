import { Injectable } from '@nestjs/common';
import { Server } from 'src/socket/server';
import { sendWorkDto } from './dto/sendWork';
import { v4 as uuid } from 'uuid';
import { responseDto } from './dto/response';
import { JobServiceApi } from '../service_job/serviceapi_job.service';
import { ResultJobDto } from 'src/service_job/dto/result_dto';

@Injectable()
export class JobService {
  private server: Server;
  constructor(private readonly jobServiceApi: JobServiceApi) {
    this.server = new Server(
      `nats://${process.env.NATS_URL}`,
      `${process.env.NATS_PORT}`,
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async sendWork(sendWork: sendWorkDto, _user: string): Promise<responseDto> {
    const newIdTrabajo: string = uuid();

    sendWork.id = newIdTrabajo;
    sendWork.userid = _user;
    this.server.listener(sendWork);
    return new responseDto(newIdTrabajo);
  }
  async getJobStatusById(_id: string): Promise<responseDto> {
    try {
      const response = await this.jobServiceApi.statusJobById(_id);
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async getJobResultByUser(_idTrabajo: string, idUser: string) {
    try {
      const response = await this.jobServiceApi.getJobResultByUser(
        _idTrabajo,
        idUser,
      );
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
  async getAllJobByUser(_idUsuaio: string): Promise<ResultJobDto[]> {
    try {
      const response =
        await this.jobServiceApi.getAllJobResultByUser(_idUsuaio);
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}
