import { Test, TestingModule } from '@nestjs/testing';
import { MeatController } from './meat.controller';

import { CreateMeatDTO } from '@application/dtos/meat';
import { MeatTypeEnum } from '@domain/enums';
import { IMeatService, MEAT_SERVICE } from '@domain/services';

describe('MeatController', () => {
  let controller: MeatController;
  const service: IMeatService = {
    create: jest.fn(),
    findById: jest.fn(),
    findAllByUserId: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeatController],
      providers: [
        {
          provide: MEAT_SERVICE,
          useValue: service,
        },
      ],
    }).compile();

    controller = module.get<MeatController>(MeatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new meat', async () => {
    const userId = '123';
    const data: CreateMeatDTO = {
      name: 'name',
      description: 'description',
      eatenAt: new Date().toDateString(),
      type: MeatTypeEnum.INCOME,
      userId: '123',
    };

    jest.spyOn(service, 'create').mockResolvedValue({
      ...data,
      id: '123',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    });

    await controller.store(userId, data);
    expect(service.create).toHaveBeenCalledWith(data);
    expect(service.create).toHaveBeenCalledTimes(1);
  });

  it('should find all meats by user id', async () => {
    const userId = '123';
    jest.spyOn(service, 'findAllByUserId').mockResolvedValue([]);
    await controller.findAllByUserId(userId);

    expect(service.findAllByUserId).toHaveBeenCalledWith(userId);
    expect(service.findAllByUserId).toHaveBeenCalledTimes(1);
  });

  it('should find meat by id', async () => {
    const userId = '123';
    const id = '123';
    jest.spyOn(service, 'findById').mockResolvedValue({
      id,
      name: 'name',
      description: 'description',
      eatenAt: new Date().toDateString(),
      type: MeatTypeEnum.INCOME,
      userId,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    });

    await controller.findById(userId, id);
    expect(service.findById).toHaveBeenCalledWith(id, userId);
    expect(service.findById).toHaveBeenCalledTimes(1);
  });

  it('should update meat', async () => {
    const userId = '123';
    const id = '123';
    const data: CreateMeatDTO = {
      name: 'name',
      description: 'description',
      eatenAt: new Date().toDateString(),
      type: MeatTypeEnum.INCOME,
      userId: '123',
    };

    jest.spyOn(service, 'update').mockResolvedValue({
      ...data,
      id: '123',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    });

    await controller.update(userId, id, data);
    expect(service.update).toHaveBeenCalledWith(id, data);
    expect(service.update).toHaveBeenCalledTimes(1);
  });

  it('should delete meat', async () => {
    const userId = '123';
    const id = '123';

    jest.spyOn(service, 'delete').mockResolvedValue();
    await controller.delete(userId, id);

    expect(service.delete).toHaveBeenCalledWith(id, userId);
    expect(service.delete).toHaveBeenCalledTimes(1);
  });
});
