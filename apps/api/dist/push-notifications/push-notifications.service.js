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
var PushNotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushNotificationsService = void 0;
const common_1 = require("@nestjs/common");
const expo_server_sdk_1 = require("expo-server-sdk");
const push_tokens_service_1 = require("../push-tokens/push-tokens.service");
let PushNotificationsService = PushNotificationsService_1 = class PushNotificationsService {
    pushTokensService;
    logger = new common_1.Logger(PushNotificationsService_1.name);
    expo;
    constructor(pushTokensService) {
        this.pushTokensService = pushTokensService;
        this.expo = new expo_server_sdk_1.Expo();
    }
    async sendToUser(userId, notification) {
        try {
            const userTokens = await this.pushTokensService.getUserTokens(userId);
            if (userTokens.length === 0) {
                this.logger.warn(`No push tokens found for user ${userId}`);
                return;
            }
            const messages = userTokens.map(token => this.createPushMessage(token.token, notification));
            await this.sendPushMessages(messages);
            this.logger.log(`Sent push notification to user ${userId} (${userTokens.length} devices)`);
        }
        catch (error) {
            this.logger.error(`Error sending push notification to user ${userId}:`, error);
        }
    }
    async sendToUsers(userIds, notification) {
        try {
            const allTokens = await this.pushTokensService.getUsersTokens(userIds);
            if (allTokens.length === 0) {
                this.logger.warn(`No push tokens found for users: ${userIds.join(', ')}`);
                return;
            }
            const messages = allTokens.map(token => this.createPushMessage(token.token, notification));
            await this.sendPushMessages(messages);
            this.logger.log(`Sent push notification to ${userIds.length} users (${allTokens.length} devices)`);
        }
        catch (error) {
            this.logger.error(`Error sending push notifications to users:`, error);
        }
    }
    async sendToAllUsers(notification) {
        try {
            this.logger.warn('sendToAllUsers not implemented yet');
        }
        catch (error) {
            this.logger.error('Error sending push notifications to all users:', error);
        }
    }
    async sendShiftNotification(shiftId, shiftData, userIds) {
        const notification = {
            title: 'Nytt skift tilgjengelig',
            body: `Du har fått tildelt et nytt skift ${shiftData.startTime ? `den ${new Date(shiftData.startTime).toLocaleDateString('nb-NO')}` : ''}`,
            data: {
                shiftId,
                type: 'shift_assigned',
                startTime: shiftData.startTime,
                endTime: shiftData.endTime,
                location: shiftData.location,
            },
            sound: 'default',
            channelId: 'shifts',
        };
        await this.sendToUsers(userIds, notification);
    }
    async sendShiftUpdateNotification(shiftId, shiftData, userIds) {
        const notification = {
            title: 'Skift oppdatert',
            body: `Et av dine skift har blitt oppdatert ${shiftData.startTime ? `den ${new Date(shiftData.startTime).toLocaleDateString('nb-NO')}` : ''}`,
            data: {
                shiftId,
                type: 'shift_updated',
                startTime: shiftData.startTime,
                endTime: shiftData.endTime,
                location: shiftData.location,
            },
            sound: 'default',
            channelId: 'shifts',
        };
        await this.sendToUsers(userIds, notification);
    }
    async sendShiftCancellationNotification(shiftId, shiftData, userIds) {
        const notification = {
            title: 'Skift avlyst',
            body: `Et av dine skift har blitt avlyst ${shiftData.startTime ? `den ${new Date(shiftData.startTime).toLocaleDateString('nb-NO')}` : ''}`,
            data: {
                shiftId,
                type: 'shift_cancelled',
                startTime: shiftData.startTime,
                endTime: shiftData.endTime,
                location: shiftData.location,
            },
            sound: 'default',
            channelId: 'shifts',
        };
        await this.sendToUsers(userIds, notification);
    }
    createPushMessage(token, notification) {
        const message = {
            to: token,
            sound: notification.sound || 'default',
            title: notification.title,
            body: notification.body,
            data: notification.data || {},
        };
        if (notification.channelId) {
            message.channelId = notification.channelId;
        }
        if (notification.badge) {
            message.badge = notification.badge;
        }
        return message;
    }
    async sendPushMessages(messages) {
        const chunks = this.expo.chunkPushNotifications(messages);
        const tickets = [];
        for (const chunk of chunks) {
            try {
                const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
                tickets.push(...ticketChunk);
            }
            catch (error) {
                this.logger.error('Error sending push notification chunk:', error);
            }
        }
        await this.handlePushTickets(tickets);
    }
    async handlePushTickets(tickets) {
        const receiptIds = tickets
            .filter(ticket => ticket.status === 'ok')
            .map(ticket => ticket.id);
        if (receiptIds.length === 0) {
            return;
        }
        try {
            const receipts = await this.expo.getPushNotificationReceiptsAsync(receiptIds);
            for (const receiptId of receiptIds) {
                const receipt = receipts[receiptId];
                if (receipt && receipt.status === 'error') {
                    this.logger.error(`Push notification delivery failed for ticket ${receiptId}:`, receipt);
                    if (receipt.details?.error === 'DeviceNotRegistered') {
                        this.logger.warn(`Device not registered for ticket ${receiptId}, token should be deactivated`);
                    }
                }
            }
        }
        catch (error) {
            this.logger.error('Error handling push notification receipts:', error);
        }
    }
};
exports.PushNotificationsService = PushNotificationsService;
exports.PushNotificationsService = PushNotificationsService = PushNotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [push_tokens_service_1.PushTokensService])
], PushNotificationsService);
//# sourceMappingURL=push-notifications.service.js.map