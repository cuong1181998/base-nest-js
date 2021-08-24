"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCP_API_ENDPOINT = exports.ROUTING = exports.PORT = exports.NODE_ENV = exports.MONGO_URI = exports.KAFKA = void 0;
const dotenv = require("dotenv");
const node_environment_enum_1 = require("../enums/node-environment.enum");
dotenv.config();
const NODE_ENV = process.env.NODE_ENV || node_environment_enum_1.NodeEnvironmentEnum.Development;
exports.NODE_ENV = NODE_ENV;
const PORT = +process.env.PORT;
exports.PORT = PORT;
const MONGO_URI = process.env.MONGO_URI;
exports.MONGO_URI = MONGO_URI;
const KAFKA = {
    BROKER_HOST: process.env.KAFKA_BROKER_HOST,
    BROKER_PORT: process.env.KAFKA_BROKER_PORT,
    CLIENT_ID: process.env.KAFKA_CLIENT_ID,
    CLUSTER_NODE: process.env.KAFKA_CLUSTER_NODE,
};
exports.KAFKA = KAFKA;
const SCP_API_ENDPOINT = process.env.SCP_API_ENDPOINT || 'https://dev.xinhxinh.live/api/v1';
exports.SCP_API_ENDPOINT = SCP_API_ENDPOINT;
const ROUTING = process.env.ROUTING;
exports.ROUTING = ROUTING;
//# sourceMappingURL=index.js.map