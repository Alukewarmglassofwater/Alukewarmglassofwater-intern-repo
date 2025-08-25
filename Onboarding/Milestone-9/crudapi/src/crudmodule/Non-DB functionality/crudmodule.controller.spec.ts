/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import {
  CrudmoduleController,
  RetNumber,
  RetItemViaNum,
} from './crudmodule.controller';
import {
  CrudmoduleService,
  ATestService,
  returnInt,
} from './crudmodule.service';

describe('CrudmoduleController', () => {
  let ctrl: CrudmoduleController;
  const svcMock: jest.Mocked<CrudmoduleService> = {
    create: jest.fn().mockReturnValue('created'),
    findAll: jest.fn().mockReturnValue('all'),
    findOne: jest.fn().mockReturnValue('one'),
    update: jest.fn().mockReturnValue('updated'),
    remove: jest.fn().mockReturnValue('removed'),
  } as any;

  beforeEach(async () => {
    const mod: TestingModule = await Test.createTestingModule({
      controllers: [CrudmoduleController],
      providers: [CrudmoduleService],
    })
      .overrideProvider(CrudmoduleService)
      .useValue(svcMock)
      .compile();

    ctrl = mod.get(CrudmoduleController);
    jest.clearAllMocks();
  });

  it('POST /crudmodule -> create()', () => {
    const dto = { name: 'x' } as any;
    expect(ctrl.create(dto)).toBe('created');
    expect(svcMock.create).toHaveBeenCalledWith(dto);
  });

  it('GET /crudmodule -> findAll()', () => {
    expect(ctrl.findAll()).toBe('all');
    expect(svcMock.findAll).toHaveBeenCalled();
  });

  it('GET /crudmodule/:id -> findOne() parses id', () => {
    expect(ctrl.findOne('7')).toBe('one'); // controller does +id
    expect(svcMock.findOne).toHaveBeenCalledWith(7);
  });

  it('PATCH /crudmodule/:id -> update()', () => {
    const dto = { name: 'y' } as any;
    expect(ctrl.update('3', dto)).toBe('updated');
    expect(svcMock.update).toHaveBeenCalledWith(3, dto);
  });

  it('DELETE /crudmodule/:id -> remove()', () => {
    expect(ctrl.remove('5')).toBe('removed');
    expect(svcMock.remove).toHaveBeenCalledWith(5);
  });
});

describe('RetNumber', () => {
  let ctrl: RetNumber;
  const aTestMock: jest.Mocked<ATestService> = {
    create: jest.fn().mockImplementation((dto: any) => ({
      message: `You sent the number ${dto.value}\n`,
    })),
  } as any;

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [RetNumber],
      providers: [ATestService],
    })
      .overrideProvider(ATestService)
      .useValue(aTestMock)
      .compile();

    ctrl = mod.get(RetNumber);
    jest.clearAllMocks();
  });

  it('POST /RetNumberController/retNumberRoute -> echoes value via service', () => {
    expect(ctrl.test({ value: 42 } as any)).toEqual({
      message: 'You sent the number 42\n',
    });
    expect(aTestMock.create).toHaveBeenCalledWith({ value: 42 });
  });
});

describe('RetItemViaNum', () => {
  let ctrl: RetItemViaNum;

  const returnIntMock: jest.Mocked<returnInt> = {
    getItemviaNum: jest.fn(),
  } as any;

  beforeEach(async () => {
    const mod = await Test.createTestingModule({
      controllers: [RetItemViaNum],
      providers: [returnInt],
    })
      .overrideProvider(returnInt)
      .useValue(returnIntMock)
      .compile();

    ctrl = mod.get(RetItemViaNum);
    jest.clearAllMocks();
  });

  it('GET /RetItemController/:id -> returns item on success', () => {
    const item = { id: 1, name: 'Test item 1' };
    returnIntMock.getItemviaNum.mockReturnValue(item);

    expect(ctrl.findOne(1)).toEqual(item);
    expect(returnIntMock.getItemviaNum).toHaveBeenCalledWith(1);
  });

  it('GET /RetItemController/:id -> propagates NotFoundException', () => {
    returnIntMock.getItemviaNum.mockImplementation(() => {
      throw new NotFoundException('not found');
    });

    expect(() => ctrl.findOne(999)).toThrow(NotFoundException);
    expect(returnIntMock.getItemviaNum).toHaveBeenCalledWith(999);
  });
});
