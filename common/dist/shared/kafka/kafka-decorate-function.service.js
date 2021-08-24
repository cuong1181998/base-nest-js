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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaDecorateFunctionService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const lodash_1 = require("lodash");
const constants_1 = require("./constants");
const kafka_logger_1 = require("./loggers/kafka.logger");
let KafkaDecorateFunctionService = class KafkaDecorateFunctionService {
    constructor(modulesContainer, metadataScanner, kafkaLogger) {
        this.modulesContainer = modulesContainer;
        this.metadataScanner = metadataScanner;
        this.kafkaLogger = kafkaLogger;
        this.consumerMap = new Map();
        this.producerSet = new Set();
    }
    explore() {
        const modules = [...this.modulesContainer.values()];
        const providers = modules
            .filter(({ providers }) => providers.size > 0)
            .map(({ providers }) => providers);
        const controllers = modules
            .filter(({ controllers }) => controllers.size > 0)
            .map(({ controllers }) => controllers);
        const instanceWrappers = [
            ...providers,
            ...controllers,
        ].reduce((acc, current) => acc.concat([...current.values()].filter((i) => !!i.instance)), []);
        const consumers = lodash_1.flatMap(instanceWrappers.map(({ instance }) => this.metadataScanner.scanFromPrototype(instance, Object.getPrototypeOf(instance), (method) => this.exploreMethodMetadata(instance, Object.getPrototypeOf(instance), method, constants_1.KAFKA_CONSUMER))));
        consumers.forEach((consumer) => {
            this.consumerMap.set(consumer.topic, {
                target: consumer.target,
                methodName: consumer.methodName,
            });
        });
        const producers = lodash_1.flatMap(instanceWrappers.map(({ instance }) => this.metadataScanner.scanFromPrototype(instance, Object.getPrototypeOf(instance), (method) => this.exploreMethodMetadata(instance, Object.getPrototypeOf(instance), method, constants_1.KAFKA_PRODUCER))));
        this.producerSet = new Set(lodash_1.flatMap(producers.map((producer) => producer.topics)));
        this.kafkaLogger.log(`Consume ${this.consumerTopics.length}, Emit ${this.producerTopics.length}`);
    }
    get consumerTopics() {
        return Array.from(this.consumerMap.keys());
    }
    get producerTopics() {
        return Array.from(this.producerSet);
    }
    async callConsumerHandler(topic, event) {
        const handler = this.consumerMap.get(topic);
        return await handler.target[handler.methodName].apply(handler.target, [
            event,
        ]);
    }
    exploreMethodMetadata(instance, instancePrototype, methodKey, metadataKey) {
        const targetCallback = instancePrototype[methodKey];
        const handler = Reflect.getMetadata(metadataKey, targetCallback);
        if (handler == null) {
            return null;
        }
        return Object.assign(Object.assign({}, handler), { target: instance });
    }
};
KafkaDecorateFunctionService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.ModulesContainer,
        core_1.MetadataScanner,
        kafka_logger_1.KafkaLogger])
], KafkaDecorateFunctionService);
exports.KafkaDecorateFunctionService = KafkaDecorateFunctionService;
//# sourceMappingURL=kafka-decorate-function.service.js.map