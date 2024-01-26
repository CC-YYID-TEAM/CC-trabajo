import { ApiProperty } from '@nestjs/swagger';
export class StatusJobDto {
  @ApiProperty({ type: Number, description: 'id' })
  id: string;
  @ApiProperty({ type: Number, description: 'status' })
  status: string;
  constructor(id) {
    this.id = id;
  }
}
