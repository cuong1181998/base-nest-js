import { DynamicModule, OnModuleInit } from '@nestjs/common';
import { IKafkaModuleConfiguration } from './interfaces';
import { KafkaDecorateFunctionService } from './kafka-decorate-function.service';
export declare class KafkaModule implements OnModuleInit {
    private readonly kafkaDecorateFunctionService;
    constructor(kafkaDecorateFunctionService: KafkaDecorateFunctionService);
    static registerAsync(options: IKafkaModuleConfiguration): DynamicModule;
    onModuleInit(): void;
}
