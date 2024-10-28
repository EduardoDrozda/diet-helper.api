import { IUserRepository, USER_REPOSITORY } from '@domain/repositories';
import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from '@application/dtos/user';
import { User } from '@domain/entities';
import { HASH_SERVICE } from '@infrastructure/hash';
import { hashMockService } from '@shared/mocks/services';

describe('UserService', () => {
  let service: UserService;
  const repository: IUserRepository = {
    create: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY,
          useValue: repository,
        },
        {
          provide: HASH_SERVICE,
          useValue: hashMockService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const data: CreateUserDTO = {
      email: 'email@email.com',
      password: 'password',
      name: 'name',
      confirmPassword: 'password',
    };

    jest.spyOn(repository, 'create').mockResolvedValue({
      id: 'id',
      email: data.email,
      name: data.name,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    } as User);

    await service.create(data);

    expect(repository.create).toHaveBeenCalledWith({
      email: data.email,
      name: data.name,
      password: data.password,
    });
    expect(repository.create).toHaveBeenCalledTimes(1);
  });

  it('should not create a user if it already exists', async () => {
    const data: CreateUserDTO = {
      email: 'email',
      password: 'password',
      name: 'name',
      confirmPassword: 'password',
    };

    jest.spyOn(repository, 'findByEmail').mockResolvedValue({
      id: 'id',
      email: data.email,
      name: data.name,
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    } as User);

    await expect(service.create(data)).rejects.toThrow('User already exists');
  });

  it('should find a user by id', async () => {
    const id = 'id';

    jest.spyOn(repository, 'findById').mockResolvedValue({
      id,
      email: 'email',
      name: 'name',
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    } as User);

    await service.findById(id);

    expect(repository.findById).toHaveBeenCalledWith(id);
    expect(repository.findById).toHaveBeenCalledTimes(1);
  });

  it('should not find a user by id if it does not exist', async () => {
    const id = 'id';

    jest.spyOn(repository, 'findById').mockResolvedValue(null);

    await expect(service.findById(id)).rejects.toThrow('User not found');
  });
});
