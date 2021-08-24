declare const NODE_ENV: string;
declare const PORT: number;
declare const MONGO_URI: string;
declare const KAFKA: {
    BROKER_HOST: string;
    BROKER_PORT: string;
    CLIENT_ID: string;
    CLUSTER_NODE: string;
};
declare const SCP_API_ENDPOINT: string;
declare const ROUTING: string;
export { KAFKA, MONGO_URI, NODE_ENV, PORT, ROUTING, SCP_API_ENDPOINT };
