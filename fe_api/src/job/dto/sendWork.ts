import { ApiProperty } from '@nestjs/swagger';
export class sendWorkDto {
  id: string;
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  expression: string;
  @ApiProperty({ type: String })
  userid: string;
}
