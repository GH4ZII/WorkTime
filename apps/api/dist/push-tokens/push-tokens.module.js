"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushTokensModule = void 0;
const common_1 = require("@nestjs/common");
const push_tokens_controller_1 = require("./push-tokens.controller");
const push_tokens_service_1 = require("./push-tokens.service");
const prisma_service_1 = require("../prisma.service");
let PushTokensModule = class PushTokensModule {
};
exports.PushTokensModule = PushTokensModule;
exports.PushTokensModule = PushTokensModule = __decorate([
    (0, common_1.Module)({
        controllers: [push_tokens_controller_1.PushTokensController],
        providers: [push_tokens_service_1.PushTokensService, prisma_service_1.PrismaService],
        exports: [push_tokens_service_1.PushTokensService],
    })
], PushTokensModule);
//# sourceMappingURL=push-tokens.module.js.map