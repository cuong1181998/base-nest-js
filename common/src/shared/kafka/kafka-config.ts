import { Inject, Injectable } from '@nestjs/common';

import { KAFKA_MODULE_CONFIGURATION } from './constants';
import { IKafkaModuleConfiguration } from './interfaces';

@Injectable()
export class KafkaConfig {
  constructor(
    @Inject(KAFKA_MODULE_CONFIGURATION)
    private readonly kafkaModuleConfiguration: IKafkaModuleConfiguration,
  ) {}

  get(): IKafkaModuleConfiguration {
    return this.kafkaModuleConfiguration;
  }
}
