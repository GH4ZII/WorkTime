"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealtimeService = void 0;
const common_1 = require("@nestjs/common");
let RealtimeService = class RealtimeService {
    server = null;
    attachServer(server) {
        this.server = server;
    }
    emitShiftCreated(shift, userIds) {
        this.emitToUsers('shift:created', { entity: 'shift', data: shift }, userIds);
    }
    emitShiftUpdated(shift, userIds) {
        this.emitToUsers('shift:updated', { entity: 'shift', data: shift }, userIds);
    }
    emitShiftDeleted(shiftId, userIds) {
        this.emitToUsers('shift:deleted', { entity: 'shift', id: shiftId }, userIds);
    }
    emitTimeOffCreated(req, userIds) {
        this.emitToUsers('timeoff:created', { entity: 'timeoff', data: req }, userIds);
    }
    emitTimeOffUpdated(req, userIds) {
        this.emitToUsers('timeoff:updated', { entity: 'timeoff', data: req }, userIds);
    }
    emitTimeOffDeleted(reqId, userIds) {
        this.emitToUsers('timeoff:deleted', { entity: 'timeoff', id: reqId }, userIds);
    }
    emitSwapCreated(req, userIds) {
        this.emitToUsers('swap:created', { entity: 'swap', data: req }, userIds);
    }
    emitSwapUpdated(req, userIds) {
        this.emitToUsers('swap:updated', { entity: 'swap', data: req }, userIds);
    }
    emitSwapDeleted(reqId, userIds) {
        this.emitToUsers('swap:deleted', { entity: 'swap', id: reqId }, userIds);
    }
    emitToUsers(event, payload, userIds) {
        if (!this.server)
            return;
        if (userIds && userIds.length > 0) {
            userIds.forEach((userId) => this.server?.to(`user:${userId}`).emit(event, payload));
        }
        else {
            this.server.emit(event, payload);
        }
    }
};
exports.RealtimeService = RealtimeService;
exports.RealtimeService = RealtimeService = __decorate([
    (0, common_1.Injectable)()
], RealtimeService);
//# sourceMappingURL=realtime.service.js.map