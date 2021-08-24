"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaProducer = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const KafkaProducer = (topics) => {
    return (target, propertyKey, descriptor) => {
        common_1.SetMetadata(constants_1.KAFKA_PRODUCER, {
            topics,
            target: target.constructor.name,
            methodName: propertyKey,
            callback: descriptor.value,
        })(target, propertyKey, descriptor);
    };
};
exports.KafkaProducer = KafkaProducer;
//# sourceMappingURL=kafka-producer.decorator.js.map