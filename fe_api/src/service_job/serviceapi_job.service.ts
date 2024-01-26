import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { StatusJobDto } from './dto/status_dto';
import { ResultJobDto } from './dto/result_dto';

@Injectable()
export class JobServiceApi {
  logger: any;
  constructor(private readonly httpService: HttpService) {}

  async findAll(_id: string): Promise<StatusJobDto[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<StatusJobDto[]>(`http://localhost:1983/getworkstatus/${_id}`)
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async statusJobById(id: string): Promise<StatusJobDto> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<StatusJobDto>(
          `http://${process.env.ApiJob_Host}:${process.env.ApiJob_Port}/getworkstatus/${id}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
  async getJobResultByUser(
    _idTrabajo: string,
    idUser: string,
  ): Promise<ResultJobDto> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<ResultJobDto>(
          `http://${process.env.ApiJob_Host}:${process.env.ApiJob_Port}/getworkresult/${_idTrabajo}/${idUser}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async getAllJobResultByUser(idUser: string): Promise<ResultJobDto[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<ResultJobDto[]>(
         `http://${process.env.ApiJob_Host}:${process.env.ApiJob_Port}/getworkresult/${idUser}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log(error);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}
