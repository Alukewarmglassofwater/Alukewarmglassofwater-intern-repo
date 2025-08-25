import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import {
  ATestService,
  CrudmoduleService,
  returnInt,
} from './Non-DB functionality/crudmodule.service';
import {
  CrudmoduleController,
  RetNumber,
  RetItemViaNum,
} from './Non-DB functionality/crudmodule.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemsService } from './DB/items.service';

import { ItemsController } from './DB/crudmodule.ItemsController';
import { LoggerMiddleware } from 'middleware/basiclogger.middleware';
import { TestItemController } from './DB/crudmodule.ItemsController';

@Module({
  imports: [TypeOrmModule.forFeature([Item])], //lets you grab items in the database
  controllers: [
    CrudmoduleController,
    RetNumber,
    RetItemViaNum,
    ItemsController,
    TestItemController,
  ],
  providers: [CrudmoduleService, ATestService, returnInt, ItemsService],
})
export class CrudmoduleModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'RetItemController/:id', method: RequestMethod.GET });
  }
}
