import { ApiProperty } from '@nestjs/swagger';

export class GetUserDTO {
  @ApiProperty({ example: 'f3d3de01-b1e3-4fd4-a65b-4dac48f61880' })
  id: string;

  @ApiProperty({ example: 'email@email.com' })
  email: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'https://example.com/avatar.png' })
  avatar_url?: string;

  @ApiProperty({ example: '2021-07-20T00:00:00.000Z' })
  created_at: string;

  @ApiProperty({ example: '2021-07-20T00:00:00.000Z' })
  updated_at: string;
}
