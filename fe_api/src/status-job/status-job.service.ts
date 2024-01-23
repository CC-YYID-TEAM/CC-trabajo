import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { StatusJobDto } from './dto';

@Injectable()
export class StatusJobService {
  logger: any;
  constructor(private readonly httpService: HttpService) {}

  findAll(): Observable<AxiosResponse<StatusJobDto[]>> {
    return this.httpService.get('http://localhost:3000/job');
  }

  async statusJobById(id: string): Promise<StatusJobDto> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<StatusJobDto>(`http://localhost:1983/getworkstatus/${id}`)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}
