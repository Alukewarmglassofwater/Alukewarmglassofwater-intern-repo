import { Test, TestingModule } from '@nestjs/testing';
import { CrudmoduleController } from './Non-DB functionality/crudmodule.controller';
import { CrudmoduleService } from './crudmodule.service';

describe('CrudmoduleController', () => {
  let controller: CrudmoduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CrudmoduleController],
      providers: [CrudmoduleService],
    }).compile();

    controller = module.get<CrudmoduleController>(CrudmoduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
