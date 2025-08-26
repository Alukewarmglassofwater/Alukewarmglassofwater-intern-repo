/* eslint-disable @typescript-eslint/no-unsafe-call */
// src/crudmodule/DB/testitem.controller.spec.ts
import 'reflect-metadata';
import { Test } from '@nestjs/testing';
import { TestItemController } from './crudmodule.ItemsController'; // adjust path
import { ItemsService } from './items.service'; // adjust path
import { CreateCrudmoduleDto } from '../dto/create-crudmodule.dto';

describe('TestItemController (unit)', () => {
  let controller: TestItemController;
  let service: jest.Mocked<ItemsService>;

  beforeAll(() => {
    // keep test output clean
    jest.spyOn(console, 'log').mockImplementation(() => {}); //don't log errors but spy on them
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    (console.log as any).mockRestore?.();
    (console.error as any).mockRestore?.();
  });

  beforeEach(async () => {
    const serviceMock = {
      createTestEncryptItem: jest.fn(),
    } as unknown as jest.Mocked<ItemsService>;

    const moduleRef = await Test.createTestingModule({
      controllers: [TestItemController],
      providers: [{ provide: ItemsService, useValue: serviceMock }],
    }).compile();

    controller = moduleRef.get(TestItemController);
    service = moduleRef.get(ItemsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('POST /testEncrypt/insert -> calls service with body and returns result', async () => {
    const body: CreateCrudmoduleDto = {
      name: 'alpha',
      description: 'x',
    } as any;
    const created = { id: 1, ...body };

    service.createTestEncryptItem.mockResolvedValue(created);

    await expect(controller.createTest(body)).resolves.toEqual(created); //fake successful db write
    expect(service.createTestEncryptItem).toHaveBeenCalledWith(body);
  });

  it('propagates service error (logs and rethrows)', async () => {
    const body: CreateCrudmoduleDto = { name: 'beta' } as any;
    service.createTestEncryptItem.mockRejectedValue(new Error('DB down')); //fake error

    await expect(controller.createTest(body)).rejects.toThrow('DB down');
    expect(service.createTestEncryptItem).toHaveBeenCalledWith(body);
  });
});
