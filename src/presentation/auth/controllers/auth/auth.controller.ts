import { CreateAuthDTO, GetAuthDTO } from '@application/dtos/auth';
import {
  AUTH_SERVICE,
  IAuthService,
} from '@domain/services/auth/IAuth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsPublic } from '@shared/decorators';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService,
  ) {}

  @IsPublic()
  @Post('login')
  @ApiOperation({ summary: 'Authenticates a user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: GetAuthDTO,
  })
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() data: CreateAuthDTO): Promise<GetAuthDTO> {
    return this.authService.login(data);
  }
}
