"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var KafkaModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const constants_1 = require("./constants");
const kafka_service_1 = require("./kafka.service");
const kafka_config_1 = require("./kafka-config");
const kafka_decorate_function_service_1 = require("./kafka-decorate-function.service");
const kafka_logger_1 = require("./loggers/kafka.logger");
let KafkaModule = KafkaModule_1 = class KafkaModule {
    constructor(kafkaDecorateFunctionService) {
        this.kafkaDecorateFunctionService = kafkaDecorateFunctionService;
    }
    static registerAsync(options) {
        return {
            module: KafkaModule_1,
            global: true,
            providers: [
                kafka_service_1.KafkaService,
                kafka_config_1.KafkaConfig,
                kafka_logger_1.KafkaLogger,
                { provide: constants_1.KAFKA_MODULE_CONFIGURATION, useValue: options },
            ],
        };
    }
    onModuleInit() {
        this.kafkaDecorateFunctionService.explore();
    }
};
KafkaModule = KafkaModule_1 = __decorate([
    common_1.Module({
        providers: [kafka_decorate_function_service_1.KafkaDecorateFunctionService, core_1.MetadataScanner],
    }),
    __metadata("design:paramtypes", [kafka_decorate_function_service_1.KafkaDecorateFunctionService])
], KafkaModule);
exports.KafkaModule = KafkaModule;
//# sourceMappingURL=kafka.module.js.map