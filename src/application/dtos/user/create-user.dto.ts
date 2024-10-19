import { ApiProperty } from '@nestjs/swagger';
import { IsEqualTo } from '@shared/validators';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  @ApiProperty({ example: 'email@email.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty({ example: 'password' })
  password: string;

  @IsNotEmpty()
  @MinLength(4)
  @IsEqualTo<CreateUserDTO>('password')
  @ApiProperty({ example: 'password' })
  confirmPassword: string;
}
