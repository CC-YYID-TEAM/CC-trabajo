import { ApiProperty } from '@nestjs/swagger';
export class StatusJobDto {
  @ApiProperty({ type: Number, description: 'id' })
  id: string;
  constructor(id) {
    this.id = id;
  }
}
