import { ApiProperty } from '@nestjs/swagger';
import { GetUserDTO } from '../user';

export class GetAuthDTO {
  @ApiProperty({
    example: {
      id: 'f3d3de01-b1e3-4fd4-a65b-4dac48f61880',
      email: 'email@email.com',
    },
  })
  user: Pick<GetUserDTO, 'id' | 'email'>;

  @ApiProperty({
    example: {
      type: 'Bearer',
      access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    },
  })
  token: {
    type: string;
    access_token: string;
  };
}
