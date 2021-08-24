import { MetadataScanner, ModulesContainer } from '@nestjs/core';
import { KafkaMessage } from 'kafkajs';
import { KafkaLogger } from './loggers/kafka.logger';
export declare class KafkaDecorateFunctionService {
    private readonly modulesContainer;
    private readonly metadataScanner;
    private readonly kafkaLogger;
    private readonly consumerMap;
    private producerSet;
    constructor(modulesContainer: ModulesContainer, metadataScanner: MetadataScanner, kafkaLogger: KafkaLogger);
    explore(): void;
    get consumerTopics(): string[];
    get producerTopics(): string[];
    callConsumerHandler(topic: string, event: KafkaMessage): Promise<void>;
    private exploreMethodMetadata;
}
