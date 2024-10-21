import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type LoggerUser = {
  id: string;
  email: string;
};

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): LoggerUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
