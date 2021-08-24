import { ConsoleLogger } from '@nestjs/common';
import { LogEntry as KafkaJSLogEntry, logLevel as KafkaJSLogLevel } from 'kafkajs';
export declare class KafkaLogger extends ConsoleLogger {
    constructor();
    getKafkaJSLoggingAdapter(logLevel: KafkaJSLogLevel): (logEntry: KafkaJSLogEntry) => void;
}
