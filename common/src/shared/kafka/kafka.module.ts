import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
import { MetadataScanner } from '@nestjs/core';

import { KAFKA_MODULE_CONFIGURATION } from './constants';
import { IKafkaModuleConfiguration } from './interfaces';
import { KafkaService } from './kafka.service';
import { KafkaConfig } from './kafka-config';
import { KafkaDecorateFunctionService } from './kafka-decorate-function.service';
import { KafkaLogger } from './loggers/kafka.logger';

@Module({
  providers: [KafkaDecorateFunctionService, MetadataScanner],
})
export class KafkaModule implements OnModuleInit {
  constructor(
    private readonly kafkaDecorateFunctionService: KafkaDecorateFunctionService,
  ) {}

  public static registerAsync(
    options: IKafkaModuleConfiguration,
  ): DynamicModule {
    return {
      module: KafkaModule,
      global: true,
      providers: [
        KafkaService,
        KafkaConfig,
        KafkaLogger,
        { provide: KAFKA_MODULE_CONFIGURATION, useValue: options },
      ],
    };
  }

  onModuleInit() {
    this.kafkaDecorateFunctionService.explore();
  }
}
