import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { StatusJobDto } from './dto';

@Injectable()
export class StatusJobService {
  constructor(private readonly httpService: HttpService) {}

  findAll(): Observable<AxiosResponse<StatusJobDto[]>> {
    return this.httpService.get('http://localhost:3000/job');
  }

  statusJobById(id: string): Observable<AxiosResponse<StatusJobDto>> {
    return this.httpService.get(`http://localhost:3000/jobs/${id}`);
  }
}
