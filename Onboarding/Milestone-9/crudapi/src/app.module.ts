import { Module } from '@nestjs/common';
import { AddTwoNumbersController, AppController } from './app.controller';
import {
  AddTwoNumbersService,
  AppService,
  SubtractTwoNumbersService,
} from './app.service';
import { CrudmoduleModule } from './crudmodule/crudmodule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { JobsModule } from './jobs/jobs.module';
import { LoggerModule } from 'nestjs-pino';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envSchema } from '../env.validation';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // .env variables are now global
      validationSchema: envSchema,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        host: cfg.get<string>('DB_HOST'),
        port: cfg.get<number>('DB_PORT'),
        username: cfg.get<string>('DB_USER'),
        password: cfg.get<string>('DB_PASS'),
        database: cfg.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false,
      }),
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
    AuthModule,
  ],
  controllers: [AppController, AddTwoNumbersController],
  providers: [
    AppService,
    HttpExceptionFilter,
    AddTwoNumbersService,
    SubtractTwoNumbersService,
  ],
})
export class AppModule {}
