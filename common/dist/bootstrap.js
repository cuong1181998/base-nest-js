"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const health = require("@cloudnative/health-connect");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const class_validator_1 = require("class-validator");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const transform_interceptor_1 = require("./common/interceptors/transform.interceptor");
async function bootstrap(AppModule) {
    const app = await core_1.NestFactory.create(AppModule);
    const healthCheck = new health.HealthChecker();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'));
    class_validator_1.useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.use('/live', health.LivenessEndpoint(healthCheck));
    app.use('/ready', health.ReadinessEndpoint(healthCheck));
    app.use('/healthz', health.HealthEndpoint(healthCheck));
    app.enableShutdownHooks();
    return app;
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=bootstrap.js.map