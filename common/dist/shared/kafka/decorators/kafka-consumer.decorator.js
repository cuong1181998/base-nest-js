"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafkaConsumer = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const kafkaConsumer = (topic) => {
    return (target, propertyKey, descriptor) => {
        common_1.SetMetadata(constants_1.KAFKA_CONSUMER, {
            topic,
            target,
            methodName: propertyKey,
            callback: descriptor.value,
        })(target, propertyKey, descriptor);
    };
};
exports.kafkaConsumer = kafkaConsumer;
//# sourceMappingURL=kafka-consumer.decorator.js.map