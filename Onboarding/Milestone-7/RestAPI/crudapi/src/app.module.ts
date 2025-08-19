import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrudmoduleModule } from './crudmodule/crudmodule.module';


@Module({
  imports: [CrudmoduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

