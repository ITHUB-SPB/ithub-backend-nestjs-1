
import { ApiProperty } from '@nestjs/swagger';

export class Parrot {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'popyg' })
  name: string;

  @ApiProperty({ example: 'red' })
  breed: string;
}
