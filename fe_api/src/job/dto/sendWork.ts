import { ApiProperty } from '@nestjs/swagger';
export class sendWorkDto {
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: Number })
  age: number;
  @ApiProperty({ type: String })
  breed: string;
}
