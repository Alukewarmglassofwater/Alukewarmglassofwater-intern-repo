"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const http_exception_filter_1 = require("../filters/http-exception.filter");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const cors_1 = __importDefault(require("@fastify/cors"));
async function bootstrap() {
    const adapter = new platform_fastify_1.FastifyAdapter({ trustProxy: true });
    const app = await core_1.NestFactory.create(app_module_1.AppModule, adapter, { bufferLogs: true });
    await app.register(rate_limit_1.default, {
        max: 100,
        timeWindow: '1 minute',
        addHeaders: {
            'x-ratelimit-limit': true,
            'x-ratelimit-remaining': true,
            'x-ratelimit-reset': true,
            'retry-after': true,
        },
    });
    await app.register(cors_1.default, {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        credentials: true,
    });
    app.useLogger(app.get(nestjs_pino_1.Logger));
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(app.get(http_exception_filter_1.HttpExceptionFilter));
    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map