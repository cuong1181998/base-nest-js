import { Module } from '@nestjs/common';
import { MongooseModule as NestMongooseModuleRoot } from '@nestjs/mongoose';

import { MONGO_URI } from '../../environments';

const options = {
  socketTimeoutMS: 10000,
  keepAlive: true,
  poolSize: 50,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

const NestMongooseModule = NestMongooseModuleRoot.forRoot(MONGO_URI, options);

@Module({
  imports: [NestMongooseModule],
})
export class ConnectionModule {}
