"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaLogger = void 0;
const common_1 = require("@nestjs/common");
const kafkajs_1 = require("kafkajs");
class KafkaLogger extends common_1.ConsoleLogger {
    constructor() {
        super('Kafka');
    }
    getKafkaJSLoggingAdapter(logLevel) {
        return (logEntry) => {
            let method;
            switch (logLevel) {
                case kafkajs_1.logLevel.ERROR:
                case kafkajs_1.logLevel.NOTHING:
                    method = 'error';
                    break;
                case kafkajs_1.logLevel.WARN:
                    method = 'warn';
                    break;
                case kafkajs_1.logLevel.INFO:
                    method = 'log';
                    break;
                case kafkajs_1.logLevel.DEBUG:
                default:
                    method = 'debug';
                    break;
            }
            const { label, namespace } = logEntry;
            const _a = logEntry.log, { message } = _a, rest = __rest(_a, ["message"]);
            this[method](`${label} [${namespace}] ${message} ${JSON.stringify(rest)}`);
        };
    }
}
exports.KafkaLogger = KafkaLogger;
//# sourceMappingURL=kafka.logger.js.map