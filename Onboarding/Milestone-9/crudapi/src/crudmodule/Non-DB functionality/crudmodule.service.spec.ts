// src/crudmodule/Non-DB functionality/crudmodule.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import {
  CrudmoduleService,
  ATestService,
  returnInt, // yes, import the class as exported
} from './crudmodule.service';

describe('crudmodule.service.ts coverage', () => {
  let crud: CrudmoduleService;
  let aTest: ATestService;
  let ints: returnInt;

  beforeEach(async () => {
    const mod: TestingModule = await Test.createTestingModule({
      providers: [CrudmoduleService, ATestService, returnInt],
    }).compile();

    crud = mod.get(CrudmoduleService);
    aTest = mod.get(ATestService);
    ints = mod.get(returnInt);
  });

  // ---- CrudmoduleService methods ----
  it('create returns message', () => {
    expect(crud.create({} as any)).toBe('This action adds a new crudmodule');
  });

  it('findAll returns message', () => {
    expect(crud.findAll()).toBe('This action returns all crudmodule');
  });

  it('findOne returns message with id', () => {
    expect(crud.findOne(7)).toBe('This action returns a #7 crudmodule');
  });

  it('update returns message with id', () => {
    expect(crud.update(3, {} as any)).toBe(
      'This action updates a #3 crudmodule',
    );
  });

  it('remove returns message with id', () => {
    expect(crud.remove(5)).toBe('This action removes a #5 crudmodule');
  });

  // ---- ATestService branch ----
  it('ATestService.create echoes dto value', () => {
    expect(aTest.create({ value: 42 })).toEqual({
      message: 'You sent the number 42\n',
    });
  });

  // ---- returnInt branches (success + error) ----
  it('returnInt.getItemviaNum returns existing item', () => {
    expect(ints.getItemviaNum(1)).toEqual({ id: 1, name: 'Test item 1' });
  });

  it('returnInt.getItemviaNum throws for missing id', () => {
    expect(() => ints.getItemviaNum(999)).toThrow(NotFoundException);
  });
});
