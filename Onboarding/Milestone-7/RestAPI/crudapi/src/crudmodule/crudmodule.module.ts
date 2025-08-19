import { Module } from '@nestjs/common';
import {
  ATestService,
  CrudmoduleService,
  returnInt,
} from './crudmodule.service';
import {
  CrudmoduleController,
  RetNumber,
  RetItemViaNum,
} from './crudmodule.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemsService } from './items.service';

import { ItemsController } from './crudmodule.ItemsController';
@Module({
  imports: [TypeOrmModule.forFeature([Item])], //lets you grab items in the database
  controllers: [
    CrudmoduleController,
    RetNumber,
    RetItemViaNum,
    ItemsController,
  ],
  providers: [CrudmoduleService, ATestService, returnInt, ItemsService],
})
export class CrudmoduleModule {}
