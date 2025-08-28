"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushTokensController = void 0;
const common_1 = require("@nestjs/common");
const push_tokens_service_1 = require("./push-tokens.service");
const create_push_token_dto_1 = require("./dto/create-push-token.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let PushTokensController = class PushTokensController {
    pushTokensService;
    constructor(pushTokensService) {
        this.pushTokensService = pushTokensService;
    }
    async registerToken(req, createPushTokenDto) {
        const userId = req.user.id;
        return this.pushTokensService.registerToken(userId, createPushTokenDto);
    }
    async getMyTokens(req) {
        const userId = req.user.id;
        return this.pushTokensService.getUserTokens(userId);
    }
    async deactivateToken(req, tokenId) {
        const userId = req.user.id;
        const token = await this.pushTokensService.getUserTokens(userId);
        const userToken = token.find(t => t.id === tokenId);
        if (!userToken) {
            throw new Error('Token not found or access denied');
        }
        return this.pushTokensService.deactivateToken(tokenId);
    }
};
exports.PushTokensController = PushTokensController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_push_token_dto_1.CreatePushTokenDto]),
    __metadata("design:returntype", Promise)
], PushTokensController.prototype, "registerToken", null);
__decorate([
    (0, common_1.Get)('my-tokens'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PushTokensController.prototype, "getMyTokens", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PushTokensController.prototype, "deactivateToken", null);
exports.PushTokensController = PushTokensController = __decorate([
    (0, common_1.Controller)('push-tokens'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [push_tokens_service_1.PushTokensService])
], PushTokensController);
//# sourceMappingURL=push-tokens.controller.js.map