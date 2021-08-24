import { SetMetadata } from '@nestjs/common';

import { KAFKA_CONSUMER } from '../constants';
import { IKafkaConsumerFunction } from '../interfaces';

export type KafkaConsumerMetadata = {
  topic: string;
  target: any;
  methodName: string | symbol;
  callback: IKafkaConsumerFunction;
};

export const kafkaConsumer = (topic: string): MethodDecorator => {
  return (target, propertyKey, descriptor: any) => {
    SetMetadata<string, KafkaConsumerMetadata>(KAFKA_CONSUMER, {
      topic,
      target,
      methodName: propertyKey,
      callback: descriptor.value,
    })(target, propertyKey, descriptor);
  };
};
