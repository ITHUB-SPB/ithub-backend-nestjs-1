import { ApiProperty } from '@nestjs/swagger';
export class Parrot {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Kesha' })
  name: string;

  @ApiProperty({ example: 'Macaw' })
  breed: string;
}
