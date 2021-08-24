import { IKafkaConsumerFunction } from '../interfaces';
export declare type KafkaConsumerMetadata = {
    topic: string;
    target: any;
    methodName: string | symbol;
    callback: IKafkaConsumerFunction;
};
export declare const kafkaConsumer: (topic: string) => MethodDecorator;
