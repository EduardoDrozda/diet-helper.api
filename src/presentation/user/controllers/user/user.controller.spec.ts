import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserDTO, GetUserDTO } from '@application/dtos/user';
import { IUserService, USER_SERVICE } from '@domain/services';

fdescribe('UserController', () => {
  let controller: UserController;
  const service: IUserService = {
    create: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: USER_SERVICE,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new user', async () => {
    const data: CreateUserDTO = {
      email: 'email@email.com',
      password: 'password',
      name: 'name',
      confirmPassword: 'password',
    };

    jest.spyOn(service, 'create').mockResolvedValue({
      id: 'id',
      email: 'email',
      name: 'name',
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    } as GetUserDTO);

    await controller.store(data);
    expect(service.create).toHaveBeenCalledWith(data);
    expect(service.create).toHaveBeenCalledTimes(1);
  });
});
