/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// src/items.controller.spec.ts
import { Test } from '@nestjs/testing';
import { ItemsController } from './crudmodule.ItemsController';
import { ItemsService } from './items.service';
import { CreateCrudmoduleDto } from '../dto/create-crudmodule.dto';
import { UpdateCrudmoduleDto } from '../dto/update-crudmodule.dto';
import { GUARDS_METADATA } from '@nestjs/common/constants';

describe('crudmodule.ItemsController (unit)', () => {
  let controller: ItemsController;
  let service: jest.Mocked<ItemsService>;

  beforeEach(async () => {
    const serviceMock = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as unknown as jest.Mocked<ItemsService>;

    const module = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [{ provide: ItemsService, useValue: serviceMock }],
    }).compile();

    controller = module.get(ItemsController);
    service = module.get(ItemsService);
  });

  it('create has JwtAuthGuard + AdminOnlyGuard (metadata on handler)', () => {
    const handlerFn = ItemsController.prototype.create; // the method function
    const guards = Reflect.getMetadata(GUARDS_METADATA, handlerFn);
    expect(guards?.map((g: any) => g?.name)).toEqual([
      'JwtAuthGuard',
      'AdminOnlyGuard',
    ]);
  });

  it('findAll has JwtAuthGuard + AdminOnlyGuard (metadata on handler)', () => {
    const handlerFn = ItemsController.prototype.findAll;
    const guards = Reflect.getMetadata(GUARDS_METADATA, handlerFn);
    expect(guards?.map((g: any) => g?.name)).toEqual([
      'JwtAuthGuard',
      'AdminOnlyGuard',
    ]);
  });

  describe('handlers', () => {
    it('create -> calls service.create(dto) and returns result', async () => {
      const dto: CreateCrudmoduleDto = { name: 'X', description: 'Y' } as any;
      const created = { id: 1, ...dto };
      service.create.mockResolvedValue(created);

      await expect(controller.create(dto)).resolves.toEqual(created);
      expect(service.create).toHaveBeenCalledWith(dto);
    });

    it('findAll -> returns array from service', async () => {
      const rows = [{ id: 1, name: 'a' }];
      service.findAll.mockResolvedValue(rows);

      await expect(controller.findAll()).resolves.toBe(rows);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('findOne -> calls service.findOne(id) and returns it', async () => {
      const item = { id: 42, name: 'answer' };
      service.findOne.mockResolvedValue(item);

      await expect(controller.findOne(42)).resolves.toBe(item);
      expect(service.findOne).toHaveBeenCalledWith(42);
    });

    it('update -> calls service.update(id, dto)', async () => {
      const dto: UpdateCrudmoduleDto = { name: 'new' } as any;
      const updated = { id: 2, name: 'new' };
      service.update.mockResolvedValue(updated);

      await expect(controller.update(2, dto)).resolves.toBe(updated);
      expect(service.update).toHaveBeenCalledWith(2, dto);
    });

    it('remove -> calls service.remove(id)', async () => {
      service.remove.mockResolvedValue({ affected: 1 } as any);

      await expect(controller.remove(3)).resolves.toEqual({ affected: 1 });
      expect(service.remove).toHaveBeenCalledWith(3);
    });
  });
});
