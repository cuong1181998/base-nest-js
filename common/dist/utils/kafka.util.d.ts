import { Message } from 'kafkajs';
export declare function getBrokersList(): string[];
export declare function encode<T>(data: T | string): string;
export declare function decode<T>(message: Message): {
    key: string;
    value: T;
};
