import { OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { TopicMessages } from 'kafkajs';
import { KafkaConfig } from './kafka-config';
import { KafkaDecorateFunctionService } from './kafka-decorate-function.service';
import { KafkaLogger } from './loggers/kafka.logger';
export declare class KafkaService implements OnApplicationBootstrap, OnApplicationShutdown {
    private readonly kafkaConfig;
    private readonly kafkaDecorateFunctionService;
    private readonly kafkaLogger;
    private kafka;
    private producer;
    private consumer;
    private admin;
    private config;
    constructor(kafkaConfig: KafkaConfig, kafkaDecorateFunctionService: KafkaDecorateFunctionService, kafkaLogger: KafkaLogger);
    emit(topicMessages: TopicMessages): Promise<void>;
    onApplicationBootstrap(): Promise<void>;
    onApplicationShutdown(): Promise<void>;
    private connectToKafka;
    private disconnect;
    private subscribeToTopics;
    private bindEventHandlers;
}
