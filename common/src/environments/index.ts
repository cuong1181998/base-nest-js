import * as dotenv from 'dotenv';

import { NodeEnvironmentEnum } from '../enums/node-environment.enum';
dotenv.config();

// environment
const NODE_ENV: string =
  process.env.NODE_ENV || NodeEnvironmentEnum.Development;

// application
const PORT: number = +process.env.PORT;

// mongo
const MONGO_URI: string = process.env.MONGO_URI;

// kafka
const KAFKA = {
  BROKER_HOST: process.env.KAFKA_BROKER_HOST,
  BROKER_PORT: process.env.KAFKA_BROKER_PORT,
  CLIENT_ID: process.env.KAFKA_CLIENT_ID,
  CLUSTER_NODE: process.env.KAFKA_CLUSTER_NODE,
};
// gateway
const SCP_API_ENDPOINT =
  process.env.SCP_API_ENDPOINT || 'https://dev.xinhxinh.live/api/v1';

const ROUTING: string = process.env.ROUTING;

export { KAFKA, MONGO_URI, NODE_ENV, PORT, ROUTING, SCP_API_ENDPOINT };
