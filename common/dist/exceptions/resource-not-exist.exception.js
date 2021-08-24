"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceNotExistException = void 0;
const common_1 = require("@nestjs/common");
class ResourceNotExistException extends common_1.HttpException {
    constructor() {
        super(`Resource doesn't exist`, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.ResourceNotExistException = ResourceNotExistException;
//# sourceMappingURL=resource-not-exist.exception.js.map