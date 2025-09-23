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
exports.RealtimeGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const realtime_service_1 = require("./realtime.service");
let RealtimeGateway = class RealtimeGateway {
    realtimeService;
    server;
    constructor(realtimeService) {
        this.realtimeService = realtimeService;
    }
    afterInit() {
        this.realtimeService.attachServer(this.server);
    }
    handleJoinUserRoom(client, userId) {
        if (!userId)
            return;
        client.join(`user:${userId}`);
    }
};
exports.RealtimeGateway = RealtimeGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], RealtimeGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], RealtimeGateway.prototype, "handleJoinUserRoom", null);
exports.RealtimeGateway = RealtimeGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: [
                'http://localhost:3000',
                'http://localhost:3001',
                'http://127.0.0.1:3000',
                'http://192.168.10.128:3000',
                'http://192.168.10.128:3001',
                'http://10.129.48.163:3000',
                'http://10.129.48.163:3001',
                'http://10.229.18.144:3000',
                'http://10.229.18.144:3001',
                'exp://192.168.10.128:8081',
                'exp://192.168.10.128:19000'
            ],
            credentials: true,
        }
    }),
    __metadata("design:paramtypes", [realtime_service_1.RealtimeService])
], RealtimeGateway);
//# sourceMappingURL=realtime.gateway.js.map