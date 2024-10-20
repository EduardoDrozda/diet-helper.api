import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAuthDTO {
  @IsEmail()
  @ApiProperty({ example: 'email@email.com' })
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty({ example: 'password' })
  password: string;
}
