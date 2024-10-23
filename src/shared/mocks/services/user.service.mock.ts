import { IUserService } from '@domain/services';

export const userServiceMock: IUserService = {
  create: jest.fn(),
  findById: jest.fn(),
  uploadAvatar: jest.fn(),
  findByEmail: jest.fn(),
};
