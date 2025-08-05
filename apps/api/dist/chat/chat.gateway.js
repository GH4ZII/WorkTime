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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("./chat.service");
let ChatGateway = class ChatGateway {
    chatService;
    server;
    connectedUsers = new Map();
    constructor(chatService) {
        this.chatService = chatService;
    }
    handleConnection(client) {
    }
    handleDisconnect(client) {
        for (const [socketId, userId] of this.connectedUsers.entries()) {
            if (socketId === client.id) {
                this.connectedUsers.delete(socketId);
                break;
            }
        }
    }
    handleJoinRoom(client, roomId) {
        client.join(roomId);
    }
    handleLeaveRoom(client, roomId) {
        client.leave(roomId);
    }
    async handleMessage(client, payload) {
        try {
            if (!payload.roomId || !payload.message || !payload.message.content || !payload.message.senderId) {
                console.error('ChatGateway: Invalid payload:', payload);
                return { success: false, error: 'Invalid message payload' };
            }
            const savedMessage = await this.chatService.addMessage(payload.roomId, payload.message);
            this.server.to(payload.roomId).emit('newMessage', savedMessage);
            return { success: true, message: savedMessage };
        }
        catch (error) {
            console.error('ChatGateway: Error handling message:', error);
            return { success: false, error: error.message };
        }
    }
    handleTyping(client, payload) {
        client.to(payload.roomId).emit('userTyping', {
            userId: payload.userId,
            isTyping: payload.isTyping
        });
    }
    sendNotificationToUser(userId, notification) {
        this.server.emit('notification', { userId, notification });
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleLeaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleTyping", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: ["http://localhost:3000"],
            credentials: true
        }
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map