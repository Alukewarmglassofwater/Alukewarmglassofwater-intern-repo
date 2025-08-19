import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrudmoduleModule } from './crudmodule/crudmodule.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'focusbear',
      password: 'focusbear',
      database: 'testDB',
      autoLoadEntities: true, // auto-detects entities across project
      synchronize: false, // for migration testing
    }),
    CrudmoduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
