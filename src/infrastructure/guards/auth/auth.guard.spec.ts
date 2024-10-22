import { environmentServiceMock, jwtServiceMock } from '@shared/mocks/services';
import { AuthGuard } from './auth.guard';
import { IEnviromentService } from '@infrastructure/enviroment';
import { IJwtService } from '@infrastructure/jwt/IJwt.service';
import { contextMock, reflectorMock } from '@shared/mocks/context';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  const environmentMock: IEnviromentService = { ...environmentServiceMock };
  const jwtMock: IJwtService = { ...jwtServiceMock };
  const reflectorContextMock = { ...reflectorMock };

  beforeEach(() => {
    guard = new AuthGuard(jwtMock, environmentMock, reflectorContextMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true if the route is public', async () => {
    reflectorContextMock.getAllAndOverride.mockReturnValue(true);
    const context = { ...contextMock };

    const result = await guard.canActivate(context as any);

    expect(result).toBe(true);
  });

  it('should return true if the token is valid', async () => {
    reflectorContextMock.getAllAndOverride.mockReturnValue(false);
    const context = { ...contextMock };
    const request = { getRequest: jest.fn() };
    const token = 'token';
    const payload = { id: 1 };

    context.switchToHttp.mockReturnValue(request);
    request.getRequest.mockReturnValue({
      headers: { authorization: `Bearer ${token}` },
    });

    jest.spyOn(environmentMock, 'get').mockReturnValue('secret' as never);

    jest.spyOn(jwtMock, 'verify').mockResolvedValue(payload);

    const result = await guard.canActivate(context as any);

    expect(result).toBe(true);

    expect(jwtMock.verify).toHaveBeenCalledWith(token, {
      secret: 'secret',
    });

    expect(request.getRequest).toHaveBeenCalled();
    expect(context.switchToHttp).toHaveBeenCalled();

    expect(reflectorContextMock.getAllAndOverride).toHaveBeenCalled();
  });

  it('should throw an error if the token is not provided', async () => {
    reflectorContextMock.getAllAndOverride.mockReturnValue(false);
    const context = { ...contextMock };
    const request = { getRequest: jest.fn() };

    context.switchToHttp.mockReturnValue(request);
    request.getRequest.mockReturnValue({
      headers: {},
    });

    try {
      await guard.canActivate(context as any);
    } catch (error) {
      expect(error.message).toBe('Token not provided');
    }

    expect(request.getRequest).toHaveBeenCalled();
    expect(context.switchToHttp).toHaveBeenCalled();

    expect(reflectorContextMock.getAllAndOverride).toHaveBeenCalled();
  });

  it('should throw an error if the token is invalid', async () => {
    reflectorContextMock.getAllAndOverride.mockReturnValue(false);
    const context = { ...contextMock };
    const request = { getRequest: jest.fn() };
    const token = 'token';

    context.switchToHttp.mockReturnValue(request);
    request.getRequest.mockReturnValue({
      headers: { authorization: `Bearer ${token}` },
    });

    jest.spyOn(environmentMock, 'get').mockReturnValue('secret' as never);

    jest.spyOn(jwtMock, 'verify').mockRejectedValue(new Error());

    try {
      await guard.canActivate(context as any);
    } catch (error) {
      expect(error.message).toBe('Invalid token');
    }

    expect(jwtMock.verify).toHaveBeenCalledWith(token, {
      secret: 'secret',
    });

    expect(request.getRequest).toHaveBeenCalled();
    expect(context.switchToHttp).toHaveBeenCalled();

    expect(reflectorContextMock.getAllAndOverride).toHaveBeenCalled();
  });
});
