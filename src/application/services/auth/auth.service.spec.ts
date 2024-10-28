import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { USER_SERVICE } from '@domain/services';
import {
  hashMockService,
  jwtServiceMock,
  userServiceMock,
} from '@shared/mocks/services';
import { HASH_SERVICE } from '@infrastructure/hash';
import { JWT_SERVICE } from '@infrastructure/jwt/IJwt.service';
import { User } from '@domain/entities';
import { CreateAuthDTO } from '@application/dtos/auth';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  const MOCK_USER: User = {
    id: 'string',
    email: 'email@email.com',
    name: 'John Doe',
    password: 'password',
    created_at: new Date().toDateString(),
    updated_at: new Date().toDateString(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: USER_SERVICE,
          useValue: userServiceMock,
        },
        {
          provide: HASH_SERVICE,
          useValue: hashMockService,
        },
        {
          provide: JWT_SERVICE,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should login', async () => {
    const credentials: CreateAuthDTO = {
      email: MOCK_USER.email,
      password: MOCK_USER.password,
    };

    jest.spyOn(userServiceMock, 'findByEmail').mockResolvedValue(MOCK_USER);

    jest.spyOn(hashMockService, 'compare').mockResolvedValue(true);

    jest.spyOn(jwtServiceMock, 'sign').mockResolvedValue('token');

    await service.login({
      email: MOCK_USER.email,
      password: MOCK_USER.password,
    });

    expect(userServiceMock.findByEmail).toHaveBeenCalledWith(MOCK_USER.email);
    expect(hashMockService.compare).toHaveBeenCalledWith(
      credentials.password,
      MOCK_USER.password,
    );

    expect(jwtServiceMock.sign).toHaveBeenCalledWith({
      id: MOCK_USER.id,
      email: MOCK_USER.email,
    });
  });

  it('should throw UnauthorizedException when user not found', async () => {
    const credentials: CreateAuthDTO = {
      email: 'email@email.com',
      password: 'password',
    };

    jest.spyOn(userServiceMock, 'findByEmail').mockResolvedValue(null);

    expect(() => service.login(credentials)).rejects.toThrow(
      UnauthorizedException,
    );

    expect(userServiceMock.findByEmail).toHaveBeenCalledWith(credentials.email);

    expect(hashMockService.compare).not.toHaveBeenCalled();
    expect(jwtServiceMock.sign).not.toHaveBeenCalled();
  });
});
