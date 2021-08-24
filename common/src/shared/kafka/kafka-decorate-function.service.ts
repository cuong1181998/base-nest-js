import { Injectable } from '@nestjs/common';
import {
  Controller,
  Injectable as IInjectable,
} from '@nestjs/common/interfaces';
import { MetadataScanner, ModulesContainer } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { KafkaMessage } from 'kafkajs';
import { flatMap } from 'lodash';

import { KAFKA_CONSUMER, KAFKA_PRODUCER } from './constants';
import { KafkaConsumerMetadata } from './decorators/kafka-consumer.decorator';
import { KafkaProducerMetadata } from './decorators/kafka-producer.decorator';
import { KafkaLogger } from './loggers/kafka.logger';

@Injectable()
export class KafkaDecorateFunctionService {
  private readonly consumerMap: Map<
    string,
    { methodName: string | symbol; target: any }
  >;
  private producerSet: Set<string>;

  constructor(
    private readonly modulesContainer: ModulesContainer,
    private readonly metadataScanner: MetadataScanner,
    private readonly kafkaLogger: KafkaLogger,
  ) {
    this.consumerMap = new Map();
    this.producerSet = new Set();
  }

  /**
   * Utilize NestJS to scan for metadata: KAFKA_CONSUMER, KAFKA_PRODUCER
   */
  explore() {
    const modules = [...this.modulesContainer.values()];
    const providers = modules
      .filter(({ providers }) => providers.size > 0)
      .map(({ providers }) => providers);

    const controllers = modules
      .filter(({ controllers }) => controllers.size > 0)
      .map(({ controllers }) => controllers);

    const instanceWrappers: InstanceWrapper<IInjectable | Controller>[] = [
      ...providers,
      ...controllers,
    ].reduce(
      (acc, current) =>
        acc.concat([...current.values()].filter((i) => !!i.instance)),
      [],
    );

    const consumers = flatMap(
      instanceWrappers.map(({ instance }) =>
        this.metadataScanner.scanFromPrototype(
          instance,
          Object.getPrototypeOf(instance),
          (method) =>
            this.exploreMethodMetadata(
              instance,
              Object.getPrototypeOf(instance),
              method,
              KAFKA_CONSUMER,
            ),
        ),
      ),
    );

    consumers.forEach((consumer) => {
      this.consumerMap.set(consumer.topic, {
        target: consumer.target,
        methodName: consumer.methodName,
      });
    });

    const producers = flatMap(
      instanceWrappers.map(({ instance }) =>
        this.metadataScanner.scanFromPrototype(
          instance,
          Object.getPrototypeOf(instance),
          (method) =>
            this.exploreMethodMetadata(
              instance,
              Object.getPrototypeOf(instance),
              method,
              KAFKA_PRODUCER,
            ),
        ),
      ),
    );

    this.producerSet = new Set(
      flatMap(producers.map((producer) => producer.topics)),
    );

    this.kafkaLogger.log(
      `Consume ${this.consumerTopics.length}, Emit ${this.producerTopics.length}`,
    );
  }

  get consumerTopics(): string[] {
    return Array.from(this.consumerMap.keys());
  }

  get producerTopics(): string[] {
    return Array.from(this.producerSet);
  }

  async callConsumerHandler(topic: string, event: KafkaMessage): Promise<void> {
    const handler = this.consumerMap.get(topic);
    return await handler.target[handler.methodName].apply(handler.target, [
      event,
    ]);
  }

  private exploreMethodMetadata(
    instance: any,
    instancePrototype: Controller,
    methodKey: string,
    metadataKey: typeof KAFKA_CONSUMER,
  ): KafkaConsumerMetadata | null;
  private exploreMethodMetadata(
    instance: any,
    instancePrototype: Controller,
    methodKey: string,
    metadataKey: typeof KAFKA_PRODUCER,
  ): KafkaProducerMetadata | null;
  private exploreMethodMetadata(
    instance: any,
    instancePrototype: Controller,
    methodKey: string,
    metadataKey: typeof KAFKA_CONSUMER | typeof KAFKA_PRODUCER,
  ): KafkaConsumerMetadata | KafkaProducerMetadata | null {
    const targetCallback = instancePrototype[methodKey];
    const handler = Reflect.getMetadata(metadataKey, targetCallback);
    if (handler == null) {
      return null;
    }
    return { ...handler, target: instance };
  }
}
