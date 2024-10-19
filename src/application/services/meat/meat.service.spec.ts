import { Test, TestingModule } from '@nestjs/testing';
import { MeatService } from './meat.service';
import { IMeatRepository, MEAT_REPOSITORY } from '@domain/repositories';
import { Meat } from '@domain/entities';
import { MeatTypeEnum } from '@domain/enums';

describe('MeatService', () => {
  let service: MeatService;
  const repository: IMeatRepository = {
    create: jest.fn(),
    delete: jest.fn(),
    findAllByUserId: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeatService,
        {
          provide: MEAT_REPOSITORY,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<MeatService>(MeatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all meats by user id', async () => {
    const userId = 'user-id';
    const meats: Meat[] = [
      {
        id: '1',
        user_id: userId,
        description: 'Meat description',
        name: 'Meat name',
        type: MeatTypeEnum.INCOME,
        eaten_at: new Date().toDateString(),
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
      },
      {
        id: '2',
        user_id: userId,
        description: 'Meat description',
        name: 'Meat name',
        type: MeatTypeEnum.OUTCOME,
        eaten_at: new Date().toDateString(),
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
      },
    ];
    jest.spyOn(repository, 'findAllByUserId').mockResolvedValue(meats);

    const result = await service.findAllByUserId(userId);
    expect(result.length).toEqual(meats.length);
    expect(result[0].userId).toEqual(userId);
    expect(result[1].userId).toEqual(userId);
    expect(repository.findAllByUserId).toHaveBeenCalledWith(userId);
    expect(repository.findAllByUserId).toHaveBeenCalledTimes(1);
  });

  it('should find meat by id', async () => {
    const userId = 'user-id';
    const meat: Meat = {
      id: '1',
      user_id: userId,
      description: 'Meat description',
      name: 'Meat name',
      type: MeatTypeEnum.INCOME,
      eaten_at: new Date().toDateString(),
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    };
    jest.spyOn(repository, 'findById').mockResolvedValue(meat);

    const result = await service.findById(meat.id, userId);
    expect(result.userId).toEqual(userId);
    expect(repository.findById).toHaveBeenCalledWith(meat.id, userId);
    expect(repository.findById).toHaveBeenCalledTimes(1);
  });

  it('should create meat', async () => {
    const meat = {
      name: 'Meat name',
      type: MeatTypeEnum.INCOME,
      eatenAt: new Date().toDateString(),
      userId: 'user-id',
      description: 'Meat description',
    };
    const createdMeat: Meat = {
      id: '1',
      user_id: meat.userId,
      description: meat.description,
      name: meat.name,
      type: meat.type,
      eaten_at: meat.eatenAt,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    };
    jest.spyOn(repository, 'create').mockResolvedValue(createdMeat);

    const result = await service.create(meat);
    expect(result.userId).toEqual(meat.userId);
    expect(repository.create).toHaveBeenCalledWith({
      name: meat.name,
      type: meat.type,
      eaten_at: meat.eatenAt,
      user_id: meat.userId,
      description: meat.description,
    });
    expect(repository.create).toHaveBeenCalledTimes(1);
  });

  it('should update meat', async () => {
    const userId = 'user-id';
    const meat = {
      id: '1',
      name: 'Meat name',
      type: MeatTypeEnum.INCOME,
      eatenAt: new Date().toDateString(),
      userId,
      description: 'Meat description',
    };
    const updatedMeat: Meat = {
      id: meat.id,
      user_id: meat.userId,
      description: meat.description,
      name: meat.name,
      type: meat.type,
      eaten_at: meat.eatenAt,
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    };
    jest.spyOn(repository, 'findById').mockResolvedValue(updatedMeat);
    jest.spyOn(repository, 'update').mockResolvedValue(updatedMeat);

    const result = await service.update(meat.id, meat);
    expect(result.userId).toEqual(meat.userId);
    expect(repository.update).toHaveBeenCalledWith(meat.id, meat);
    expect(repository.update).toHaveBeenCalledTimes(1);
  });

  it('should throw not found exception when meat not found', async () => {
    const userId = 'user-id';
    const meat = {
      id: '1',
      name: 'Meat name',
      type: MeatTypeEnum.INCOME,
      eatenAt: new Date().toDateString(),
      userId,
      description: 'Meat description',
    };
    jest.spyOn(repository, 'findById').mockResolvedValue(null);

    try {
      await service.update(meat.id, meat);
    } catch (error) {
      expect(error.message).toEqual('Meat not found');
    }
  });

  it('should delete meat', async () => {
    const userId = 'user-id';
    const meat: Meat = {
      id: '1',
      user_id: userId,
      description: 'Meat description',
      name: 'Meat name',
      type: MeatTypeEnum.INCOME,
      eaten_at: new Date().toDateString(),
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    };

    jest.spyOn(repository, 'findById').mockResolvedValue(meat);
    jest.spyOn(repository, 'delete');

    await service.delete(meat.id, userId);
    expect(repository.delete).toHaveBeenCalledWith(meat.id);
    expect(repository.delete).toHaveBeenCalledTimes(1);
  });
});
