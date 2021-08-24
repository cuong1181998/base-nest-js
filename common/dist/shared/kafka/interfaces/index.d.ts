import { ConsumerConfig, ConsumerRunConfig, KafkaConfig, KafkaMessage, ProducerConfig } from 'kafkajs';
export declare type IKafkaConsumerFunction = (event: KafkaMessage) => Promise<void>;
export declare type IKafkaProducerFunction = () => Promise<void>;
export interface IKafkaModuleConfiguration {
    client: KafkaConfig;
    consumer?: ConsumerConfig;
    consumerRun?: ConsumerRunConfig;
    producer?: ProducerConfig;
}
