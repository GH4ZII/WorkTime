import { PushTokensService } from '../push-tokens/push-tokens.service';
export interface PushNotificationData {
    title: string;
    body: string;
    data?: Record<string, any>;
    sound?: 'default' | null;
    badge?: number;
    channelId?: string;
}
export declare class PushNotificationsService {
    private readonly pushTokensService;
    private readonly logger;
    private expo;
    constructor(pushTokensService: PushTokensService);
    sendToUser(userId: string, notification: PushNotificationData): Promise<void>;
    sendToUsers(userIds: string[], notification: PushNotificationData): Promise<void>;
    sendToAllUsers(notification: PushNotificationData): Promise<void>;
    sendShiftNotification(shiftId: string, shiftData: any, userIds: string[]): Promise<void>;
    sendShiftUpdateNotification(shiftId: string, shiftData: any, userIds: string[]): Promise<void>;
    sendShiftCancellationNotification(shiftId: string, shiftData: any, userIds: string[]): Promise<void>;
    private createPushMessage;
    private sendPushMessages;
    private handlePushTickets;
}
