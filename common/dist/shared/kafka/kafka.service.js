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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaService = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
const kafka_config_1 = require("./kafka-config");
const kafka_decorate_function_service_1 = require("./kafka-decorate-function.service");
const kafka_logger_1 = require("./loggers/kafka.logger");
let KafkaService = class KafkaService {
    constructor(kafkaConfig, kafkaDecorateFunctionService, kafkaLogger) {
        this.kafkaConfig = kafkaConfig;
        this.kafkaDecorateFunctionService = kafkaDecorateFunctionService;
        this.kafkaLogger = kafkaLogger;
        this.config = this.kafkaConfig.get();
        this.kafka = new kafkajs_1.Kafka(Object.assign(Object.assign({}, this.config.client), { logCreator: this.kafkaLogger.getKafkaJSLoggingAdapter.bind(this.kafkaLogger) }));
        if (this.config.consumer) {
            this.consumer = this.kafka.consumer(this.config.consumer);
        }
        if (this.config.producer) {
            this.producer = this.kafka.producer(this.config.producer);
        }
        this.admin = this.kafka.admin();
    }
    async emit(topicMessages) {
        if (!this.producer) {
            return;
        }
        try {
            await this.producer.send({
                topic: topicMessages.topic,
                messages: topicMessages.messages,
            });
        }
        catch (reject) {
            this.kafkaLogger.error(`Emit fail at: ${JSON.stringify(topicMessages)}`);
            throw reject;
        }
    }
    async onApplicationBootstrap() {
        await this.connectToKafka();
        await this.subscribeToTopics();
        await this.bindEventHandlers();
    }
    async onApplicationShutdown() {
        await this.disconnect();
    }
    async connectToKafka() {
        if (this.producer) {
            await this.producer.connect();
        }
        if (this.consumer) {
            await this.consumer.connect();
        }
        await this.admin.connect();
        this.kafkaLogger.log('Connect Kafka success!');
    }
    async disconnect() {
        if (this.producer) {
            await this.producer.disconnect();
            this.kafkaLogger.log('Disconnect Kafka success!');
        }
        if (this.consumer) {
            await this.consumer.stop();
            await this.consumer.disconnect();
        }
        await this.admin.disconnect();
    }
    async subscribeToTopics() {
        var e_1, _a;
        if (!this.consumer) {
            return;
        }
        try {
            for (var _b = __asyncValues(this.kafkaDecorateFunctionService
                .consumerTopics), _c; _c = await _b.next(), !_c.done;) {
                const topic = _c.value;
                try {
                    await this.consumer.subscribe({ topic, fromBeginning: false });
                }
                catch (reject) {
                    this.kafkaLogger.error(`Subscribe fail at topic ${topic}`);
                    throw reject;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    bindEventHandlers() {
        var _a, _b;
        if (!this.consumer) {
            return;
        }
        this.consumer.run(Object.assign(Object.assign({}, ((_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.consumerRun) !== null && _b !== void 0 ? _b : {})), { eachMessage: async ({ topic, message }) => {
                try {
                    await this.kafkaDecorateFunctionService.callConsumerHandler(topic, message);
                }
                catch (reject) {
                    this.kafkaLogger.error(`Watching message fail at topic  ${topic}`, reject);
                }
            } }));
    }
};
KafkaService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [kafka_config_1.KafkaConfig,
        kafka_decorate_function_service_1.KafkaDecorateFunctionService,
        kafka_logger_1.KafkaLogger])
], KafkaService);
exports.KafkaService = KafkaService;
//# sourceMappingURL=kafka.service.js.map