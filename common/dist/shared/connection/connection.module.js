"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const environments_1 = require("../../environments");
const options = {
    socketTimeoutMS: 10000,
    keepAlive: true,
    poolSize: 50,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
};
const NestMongooseModule = mongoose_1.MongooseModule.forRoot(environments_1.MONGO_URI, options);
let ConnectionModule = class ConnectionModule {
};
ConnectionModule = __decorate([
    common_1.Module({
        imports: [NestMongooseModule],
    })
], ConnectionModule);
exports.ConnectionModule = ConnectionModule;
//# sourceMappingURL=connection.module.js.map