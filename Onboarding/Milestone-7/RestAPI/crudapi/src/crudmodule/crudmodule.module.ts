import { Module } from '@nestjs/common';
import { ATestService, CrudmoduleService } from './crudmodule.service';
import { CrudmoduleController, retNumber } from './crudmodule.controller';

@Module({
  controllers: [CrudmoduleController, retNumber],
  providers: [CrudmoduleService, ATestService],
})
export class CrudmoduleModule {}
