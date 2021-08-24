import { IKafkaProducerFunction } from '../interfaces';
export declare type KafkaProducerMetadata = {
    topics: string[];
    target: any;
    methodName: string | symbol;
    callback: IKafkaProducerFunction;
};
export declare const KafkaProducer: (topics: string[]) => MethodDecorator;
