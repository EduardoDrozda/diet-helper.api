import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AUTH_SERVICE } from '@domain/services';
import { authServiceMock } from '@shared/mocks/services';
import { GetAuthDTO } from '@application/dtos/auth';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AUTH_SERVICE,
          useValue: authServiceMock,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login', async () => {
    const result: GetAuthDTO = {
      token: {
        type: 'Bearer',
        access_token: '',
      },
      user: {
        id: 'id',
        email: 'email',
      },
    };

    jest.spyOn(authServiceMock, 'login').mockResolvedValue(result);

    expect(
      await controller.login({
        email: 'email',
        password: 'password',
      }),
    ).toBe(result);
  });
});
