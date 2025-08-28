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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushTokensService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PushTokensService = class PushTokensService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerToken(userId, createPushTokenDto) {
        const { token, deviceId, platform } = createPushTokenDto;
        const existingToken = await this.prisma.pushToken.findUnique({
            where: { token },
        });
        if (existingToken) {
            if (existingToken.userId === userId) {
                return this.prisma.pushToken.update({
                    where: { id: existingToken.id },
                    data: {
                        deviceId,
                        platform,
                        isActive: true,
                        updatedAt: new Date(),
                    },
                });
            }
            else {
                await this.prisma.pushToken.update({
                    where: { id: existingToken.id },
                    data: { isActive: false },
                });
            }
        }
        return this.prisma.pushToken.create({
            data: {
                userId,
                token,
                deviceId,
                platform,
                isActive: true,
            },
        });
    }
    async getUserTokens(userId) {
        return this.prisma.pushToken.findMany({
            where: {
                userId,
                isActive: true,
            },
        });
    }
    async getUsersTokens(userIds) {
        return this.prisma.pushToken.findMany({
            where: {
                userId: { in: userIds },
                isActive: true,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
    async deactivateToken(tokenId) {
        return this.prisma.pushToken.update({
            where: { id: tokenId },
            data: { isActive: false },
        });
    }
    async deactivateUserTokens(userId) {
        return this.prisma.pushToken.updateMany({
            where: { userId },
            data: { isActive: false },
        });
    }
    async cleanupInactiveTokens() {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return this.prisma.pushToken.deleteMany({
            where: {
                isActive: false,
                updatedAt: {
                    lt: thirtyDaysAgo,
                },
            },
        });
    }
};
exports.PushTokensService = PushTokensService;
exports.PushTokensService = PushTokensService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PushTokensService);
//# sourceMappingURL=push-tokens.service.js.map