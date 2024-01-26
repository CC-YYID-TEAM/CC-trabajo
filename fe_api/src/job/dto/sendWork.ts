import { ApiProperty } from '@nestjs/swagger';
export class sendWorkDto {
  id: string;
  userid: string;
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  expression: string;
}
