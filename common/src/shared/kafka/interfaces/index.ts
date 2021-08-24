import {
  ConsumerConfig,
  ConsumerRunConfig,
  KafkaConfig,
  KafkaMessage,
  ProducerConfig,
} from 'kafkajs';

export type IKafkaConsumerFunction = (event: KafkaMessage) => Promise<void>;

export type IKafkaProducerFunction = () => Promise<void>;

export interface IKafkaModuleConfiguration {
  client: KafkaConfig;
  consumer?: ConsumerConfig;
  consumerRun?: ConsumerRunConfig;
  producer?: ProducerConfig;
}
