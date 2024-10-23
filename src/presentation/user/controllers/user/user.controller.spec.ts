import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { CreateUserDTO, GetUserDTO } from '@application/dtos/user';
import { USER_SERVICE } from '@domain/services';
import { userServiceMock } from '@shared/mocks/services';
import { UploadFileDTO } from '@application/dtos/file/upload-file.dto';
import { FileMimeType } from '@domain/enums';

fdescribe('UserController', () => {
  let controller: UserController;

  const service = { ...userServiceMock };

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

  it('should upload user avatar', async () => {
    const user = {
      id: 'id',
      email: 'email',
      name: 'name',
      created_at: new Date().toDateString(),
      updated_at: new Date().toDateString(),
    };

    const avatar: UploadFileDTO = {
      fieldname: 'avatar',
      originalname: 'avatar.jpg',
      encoding: '7bit',
      buffer: Buffer.from('avatar'),
      mimetype: FileMimeType.ImagePng,
      size: 100,
    };

    jest.spyOn(service, 'uploadAvatar').mockResolvedValue({} as GetUserDTO);

    await controller.uploadAvatar(user, avatar);
    expect(service.uploadAvatar).toHaveBeenCalledWith(user.id, avatar);
    expect(service.uploadAvatar).toHaveBeenCalledTimes(1);
  });
});
