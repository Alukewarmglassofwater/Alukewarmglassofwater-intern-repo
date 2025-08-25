import { Test, TestingModule } from '@nestjs/testing';
import { CrudmoduleService } from './crudmodule.service';

describe('CrudmoduleService', () => {
  let service: CrudmoduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrudmoduleService],
    }).compile();

    service = module.get<CrudmoduleService>(CrudmoduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
