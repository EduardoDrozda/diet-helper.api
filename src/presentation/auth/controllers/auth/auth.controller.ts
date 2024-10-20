import { Controller, Post } from '@nestjs/common';

@Controller()
export class AuthController {
  constructor() {}

  @Post('login')
  async login() {
    return 'login';
  }
}
