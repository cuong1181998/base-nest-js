import { IKafkaModuleConfiguration } from './interfaces';
export declare class KafkaConfig {
    private readonly kafkaModuleConfiguration;
    constructor(kafkaModuleConfiguration: IKafkaModuleConfiguration);
    get(): IKafkaModuleConfiguration;
}
