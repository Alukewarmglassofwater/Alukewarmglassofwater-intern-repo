"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const crudmodule_module_1 = require("./crudmodule/crudmodule.module");
const typeorm_1 = require("@nestjs/typeorm");
const bullmq_1 = require("@nestjs/bullmq");
const jobs_module_1 = require("./jobs/jobs.module");
const nestjs_pino_1 = require("nestjs-pino");
const http_exception_filter_1 = require("../filters/http-exception.filter");
const config_1 = require("@nestjs/config");
const env_validation_1 = require("../env.validation");
const auth_module_1 = require("../auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: env_validation_1.envSchema,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (cfg) => ({
                    type: 'postgres',
                    host: cfg.get('DB_HOST'),
                    port: cfg.get('DB_PORT'),
                    username: cfg.get('DB_USER'),
                    password: cfg.get('DB_PASS'),
                    database: cfg.get('DB_NAME'),
                    autoLoadEntities: true,
                    synchronize: false,
                }),
            }),
            bullmq_1.BullModule.forRoot({
                connection: {
                    host: '127.0.0.1',
                    port: 6379,
                },
            }),
            nestjs_pino_1.LoggerModule.forRoot({
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
            crudmodule_module_1.CrudmoduleModule,
            jobs_module_1.JobsModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController, app_controller_1.AddTwoNumbersController],
        providers: [
            app_service_1.AppService,
            http_exception_filter_1.HttpExceptionFilter,
            app_service_1.AddTwoNumbersService,
            app_service_1.SubtractTwoNumbersService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map