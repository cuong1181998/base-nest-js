import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { Admin, Consumer, Kafka, Producer, TopicMessages } from 'kafkajs';

import { IKafkaModuleConfiguration } from './interfaces';
import { KafkaConfig } from './kafka-config';
import { KafkaDecorateFunctionService } from './kafka-decorate-function.service';
import { KafkaLogger } from './loggers/kafka.logger';

@Injectable()
export class KafkaService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;
  private admin: Admin;
  private config: IKafkaModuleConfiguration;

  constructor(
    private readonly kafkaConfig: KafkaConfig,
    private readonly kafkaDecorateFunctionService: KafkaDecorateFunctionService,
    private readonly kafkaLogger: KafkaLogger,
  ) {
    this.config = this.kafkaConfig.get();
    this.kafka = new Kafka({
      ...this.config.client,
      logCreator: this.kafkaLogger.getKafkaJSLoggingAdapter.bind(
        this.kafkaLogger,
      ),
    });
    if (this.config.consumer) {
      this.consumer = this.kafka.consumer(this.config.consumer);
    }
    if (this.config.producer) {
      this.producer = this.kafka.producer(this.config.producer);
    }
    this.admin = this.kafka.admin();
  }

  async emit(topicMessages: TopicMessages): Promise<void> {
    if (!this.producer) {
      return;
    }
    try {
      await this.producer.send({
        topic: topicMessages.topic,
        messages: topicMessages.messages,
      });
    } catch (reject) {
      this.kafkaLogger.error(`Emit fail at: ${JSON.stringify(topicMessages)}`);
      throw reject;
    }
  }

  async onApplicationBootstrap() {
    await this.connectToKafka();
    await this.subscribeToTopics();
    await this.bindEventHandlers();
  }
  async onApplicationShutdown() {
    await this.disconnect();
  }

  private async connectToKafka(): Promise<void> {
    if (this.producer) {
      await this.producer.connect();
    }
    if (this.consumer) {
      await this.consumer.connect();
    }
    await this.admin.connect();
    this.kafkaLogger.log('Connect Kafka success!');
  }

  private async disconnect(): Promise<void> {
    if (this.producer) {
      await this.producer.disconnect();
      this.kafkaLogger.log('Disconnect Kafka success!');
    }
    if (this.consumer) {
      await this.consumer.stop();
      await this.consumer.disconnect();
    }
    await this.admin.disconnect();
  }

  private async subscribeToTopics(): Promise<void> {
    if (!this.consumer) {
      return;
    }
    for await (const topic of this.kafkaDecorateFunctionService
      .consumerTopics) {
      try {
        await this.consumer.subscribe({ topic, fromBeginning: false });
      } catch (reject) {
        this.kafkaLogger.error(`Subscribe fail at topic ${topic}`);
        throw reject;
      }
    }
  }

  private bindEventHandlers(): void {
    if (!this.consumer) {
      return;
    }
    this.consumer.run({
      ...(this.config?.consumerRun ?? {}),
      eachMessage: async ({ topic, message }) => {
        try {
          await this.kafkaDecorateFunctionService.callConsumerHandler(
            topic,
            message,
          );
        } catch (reject) {
          this.kafkaLogger.error(
            `Watching message fail at topic  ${topic}`,
            reject,
          );
        }
      },
    });
  }
}
