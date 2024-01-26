import { ApiProperty } from '@nestjs/swagger';
export class ResultJobDto {
  @ApiProperty({ type: Number, description: 'id' })
  id: string;
  @ApiProperty({ type: Number, description: 'result' })
  result: string;
  constructor(id) {
    this.id = id;
  }
}
