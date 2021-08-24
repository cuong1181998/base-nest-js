import { Message } from 'kafkajs';
import { isString } from 'lodash';

import { NodeEnvironmentEnum } from '../enums/node-environment.enum';
import { KAFKA, NODE_ENV } from '../environments';

export function getBrokersList(): string[] {
  switch (NODE_ENV) {
    case NodeEnvironmentEnum.Development:
      return [`${KAFKA.BROKER_HOST}:${KAFKA.BROKER_PORT}`];
    case NodeEnvironmentEnum.Staging:
      return Array.from({ length: +KAFKA.CLUSTER_NODE }).map(
        (_, index) =>
          `kafka${index + 1}.stg.xinhxinh.live:${KAFKA.BROKER_PORT}`,
      );
    case NodeEnvironmentEnum.Production:
      return Array.from({ length: +KAFKA.CLUSTER_NODE }).map(
        (_, index) => `kafka${index + 1}.service.prod.scp:${KAFKA.BROKER_PORT}`,
      );
  }
}

export function encode<T>(data: T | string): string {
  if (isString(data)) {
    return data;
  }
  return JSON.stringify(data);
}

export function decode<T>(message: Message): { key: string; value: T } {
  return {
    key: message.key.toString(),
    value: JSON.parse(message.value.toString()),
  };
}
