import { Module } from '@nestjs/common';
import { ATestService, CrudmoduleService, returnInt } from './crudmodule.service';
import { CrudmoduleController, RetItemViaNum, RetNumber } from './crudmodule.controller';

@Module({
  controllers: [CrudmoduleController, RetNumber, RetItemViaNum],
  providers: [CrudmoduleService, ATestService, returnInt],
})
export class CrudmoduleModule {}
