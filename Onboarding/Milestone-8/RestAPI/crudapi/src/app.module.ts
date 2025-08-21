import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrudmoduleModule } from './crudmodule/crudmodule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { JobsModule } from './jobs/jobs.module';
import { LoggerModule } from 'nestjs-pino';
import { HttpExceptionFilter } from 'filters/http-exception.filter';

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

    // Queues (global Redis connection)
    BullModule.forRoot({
      connection: {
        host: '127.0.0.1',
        port: 6379,
      },
    }),

    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: require.resolve('pino-pretty'),
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
          },
        },
      },
    }),

    CrudmoduleModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [AppService, HttpExceptionFilter],
})
export class AppModule {}
