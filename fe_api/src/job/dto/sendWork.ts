import { ApiProperty } from '@nestjs/swagger';
export class sendWorkDto {
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  expression: string;
}
