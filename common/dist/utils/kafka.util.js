"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = exports.getBrokersList = void 0;
const lodash_1 = require("lodash");
const node_environment_enum_1 = require("../enums/node-environment.enum");
const environments_1 = require("../environments");
function getBrokersList() {
    switch (environments_1.NODE_ENV) {
        case node_environment_enum_1.NodeEnvironmentEnum.Development:
            return [`${environments_1.KAFKA.BROKER_HOST}:${environments_1.KAFKA.BROKER_PORT}`];
        case node_environment_enum_1.NodeEnvironmentEnum.Staging:
            return Array.from({ length: +environments_1.KAFKA.CLUSTER_NODE }).map((_, index) => `kafka${index + 1}.stg.xinhxinh.live:${environments_1.KAFKA.BROKER_PORT}`);
        case node_environment_enum_1.NodeEnvironmentEnum.Production:
            return Array.from({ length: +environments_1.KAFKA.CLUSTER_NODE }).map((_, index) => `kafka${index + 1}.service.prod.scp:${environments_1.KAFKA.BROKER_PORT}`);
    }
}
exports.getBrokersList = getBrokersList;
function encode(data) {
    if (lodash_1.isString(data)) {
        return data;
    }
    return JSON.stringify(data);
}
exports.encode = encode;
function decode(message) {
    return {
        key: message.key.toString(),
        value: JSON.parse(message.value.toString()),
    };
}
exports.decode = decode;
//# sourceMappingURL=kafka.util.js.map