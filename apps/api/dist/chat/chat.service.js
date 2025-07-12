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
exports.ChatService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ChatService = class ChatService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const { name, memberIds } = dto;
        return this.prisma.chatRoom.create({
            data: {
                name: name,
                members: {
                    create: memberIds?.map(userId => ({
                        user: {
                            connect: { id: userId },
                        },
                    })),
                },
            },
            include: {
                members: { include: { user: { select: { id: true, name: true } } } },
            },
        });
    }
    findAll() {
        return this.prisma.chatRoom.findMany({
            include: {
                members: true,
                messages: {
                    orderBy: { sentAt: 'desc' },
                    take: 1,
                },
            },
        });
    }
    async findOne(id) {
        const room = await this.prisma.chatRoom.findUnique({
            where: { id },
            include: {
                members: { include: { user: { select: { id: true, name: true } } } },
            },
        });
        if (!room) {
            throw new common_1.NotFoundException(`Chatterom med ID ${id} ble ikke funnet.`);
        }
        return room;
    }
    async update(id, dto) {
        return this.prisma.chatRoom.update({
            where: { id },
            data: {
                name: dto.name,
            },
        });
    }
    async addMembers(roomId, userIds) {
        await this.prisma.chatMember.createMany({
            data: userIds.map(userId => ({
                roomId,
                userId,
            })),
            skipDuplicates: true,
        });
        return this.findOne(roomId);
    }
    async removeMembers(roomId, userIds) {
        await this.prisma.chatMember.deleteMany({
            where: {
                roomId: roomId,
                userId: { in: userIds },
            },
        });
        return this.findOne(roomId);
    }
    getMessages(roomId) {
        return this.prisma.message.findMany({
            where: { roomId },
            orderBy: { sentAt: 'asc' },
            include: {
                sender: { select: { id: true, name: true } },
            },
        });
    }
    async addMessage(roomId, dto) {
        return this.prisma.message.create({
            data: {
                content: dto.content,
                roomId: roomId,
                senderId: dto.senderId,
            },
        });
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatService);
//# sourceMappingURL=chat.service.js.map