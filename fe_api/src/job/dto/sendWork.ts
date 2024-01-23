import { ApiProperty } from '@nestjs/swagger';
export class sendWorkDto {
  idTrabajo: string;
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  expression: string;
}
