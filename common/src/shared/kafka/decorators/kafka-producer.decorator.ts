import { SetMetadata } from '@nestjs/common';

import { KAFKA_PRODUCER } from '../constants';
import { IKafkaProducerFunction } from '../interfaces';

export type KafkaProducerMetadata = {
  topics: string[];
  target: any;
  methodName: string | symbol;
  callback: IKafkaProducerFunction;
};

export const KafkaProducer = (topics: string[]): MethodDecorator => {
  return (target, propertyKey, descriptor: any) => {
    SetMetadata<string, KafkaProducerMetadata>(KAFKA_PRODUCER, {
      topics,
      target: target.constructor.name,
      methodName: propertyKey,
      callback: descriptor.value,
    })(target, propertyKey, descriptor);
  };
};
