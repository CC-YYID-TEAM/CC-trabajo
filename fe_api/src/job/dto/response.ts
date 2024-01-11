import { ApiProperty } from '@nestjs/swagger';
export class responseDto {
  @ApiProperty({ type: Number, description: 'id' })
  id: string;
}
