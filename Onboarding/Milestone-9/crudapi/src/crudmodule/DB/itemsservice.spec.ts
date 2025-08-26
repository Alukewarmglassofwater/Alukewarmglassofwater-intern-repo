// src/crudmodule/DB/items.service.spec.ts
import { Test } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { Item } from '../entities/item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import type { Repository, DeleteResult } from 'typeorm';

type RepoMock<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('ItemsService (unit)', () => {
  let service: ItemsService;
  let repo: RepoMock<Item>;

  beforeEach(async () => {
    repo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      delete: jest.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        ItemsService,
        { provide: getRepositoryToken(Item), useValue: repo }, // <-- mock DB repo
      ],
    }).compile();

    service = moduleRef.get(ItemsService);
  });

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    it('creates with defaults (description undefined, quantity 0) and saves', async () => {
      const dto = { name: 'alpha' }; // no desc/qty given
      const entity = {
        id: undefined,
        name: 'alpha',
        description: undefined,
        quantity: 0,
      };
      const saved = { id: 1, ...entity };

      (repo.create as jest.Mock).mockReturnValue(entity);
      (repo.save as jest.Mock).mockResolvedValue(saved);

      await expect(service.create(dto)).resolves.toEqual(saved);
      expect(repo.create).toHaveBeenCalledWith({
        name: 'alpha',
        description: undefined,
        quantity: 0,
      });
      expect(repo.save).toHaveBeenCalledWith(entity);
    });

    it('respects provided description and quantity', async () => {
      const dto = { name: 'beta', description: 'desc', quantity: 5 };
      const entity = { id: undefined, ...dto };
      const saved = { id: 2, ...dto };

      (repo.create as jest.Mock).mockReturnValue(entity);
      (repo.save as jest.Mock).mockResolvedValue(saved);

      await expect(service.create(dto)).resolves.toEqual(saved);
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalledWith(entity);
    });
  });

  describe('findAll', () => {
    it('returns repo.find()', async () => {
      const rows = [{ id: 1 } as Item, { id: 2 } as Item];
      (repo.find as jest.Mock).mockResolvedValue(rows);

      await expect(service.findAll()).resolves.toBe(rows);
      expect(repo.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('returns the row when found', async () => {
      const row = { id: 42 } as Item;
      (repo.findOne as jest.Mock).mockResolvedValue(row);

      await expect(service.findOne(42)).resolves.toBe(row);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 42 } });
    });

    it('throws NotFound when missing', async () => {
      (repo.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    });
  });

  describe('update', () => {
    it('loads the item, merges dto, and saves', async () => {
      const existing = {
        id: 5,
        name: 'old',
        description: 'd',
        quantity: 1,
      } as Item;
      const dto = { name: 'new', quantity: 10 };
      const saved = { ...existing, ...dto };

      (repo.findOne as jest.Mock).mockResolvedValue(existing); // used via service.findOne()
      (repo.save as jest.Mock).mockResolvedValue(saved);

      await expect(service.update(5, dto)).resolves.toEqual(saved);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 5 } });
      // ensure merged object was passed to save
      expect(repo.save).toHaveBeenCalledWith(expect.objectContaining(saved));
    });

    it('throws NotFound when updating a missing item', async () => {
      (repo.findOne as jest.Mock).mockResolvedValue(null);

      await expect(service.update(321, { name: 'x' })).rejects.toThrow(
        NotFoundException,
      );
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 321 } });
    });
  });

  describe('remove', () => {
    it('deletes and resolves void on success', async () => {
      const res: DeleteResult = { affected: 1, raw: undefined as any };
      (repo.delete as jest.Mock).mockResolvedValue(res);

      await expect(service.remove(7)).resolves.toBeUndefined();
      expect(repo.delete).toHaveBeenCalledWith(7);
    });

    it('throws NotFound when delete affected=0', async () => {
      const res: DeleteResult = { affected: 0, raw: undefined as any };
      (repo.delete as jest.Mock).mockResolvedValue(res);

      await expect(service.remove(8)).rejects.toThrow(NotFoundException);
      expect(repo.delete).toHaveBeenCalledWith(8);
    });
  });

  describe('createTestEncryptItem', () => {
    it('builds an Item and saves (defaults: description "", quantity 0)', async () => {
      const body = {
        name: 'enc',
        description: undefined,
        quantity: undefined,
      } as any;
      const saved = {
        id: 9,
        name: 'enc',
        description: '',
        quantity: 0,
      } as Item;

      (repo.save as jest.Mock).mockResolvedValue(saved);

      await expect(service.createTestEncryptItem(body)).resolves.toEqual(saved);
      // It uses "new Item()" so we assert the shape passed to save:
      expect(repo.save).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'enc', description: '', quantity: 0 }),
      );
    });

    it('uses provided desc/qty if present', async () => {
      const body = { name: 'enc2', description: 'D', quantity: 3 } as any;
      const saved = {
        id: 10,
        name: 'enc2',
        description: 'D',
        quantity: 3,
      } as Item;

      (repo.save as jest.Mock).mockResolvedValue(saved);

      await expect(service.createTestEncryptItem(body)).resolves.toEqual(saved);
      expect(repo.save).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'enc2',
          description: 'D',
          quantity: 3,
        }),
      );
    });
  });
});
