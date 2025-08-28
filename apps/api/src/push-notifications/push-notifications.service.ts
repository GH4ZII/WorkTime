import { Injectable, Logger } from '@nestjs/common';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { PushTokensService } from '../push-tokens/push-tokens.service';

export interface PushNotificationData {
  title: string;
  body: string;
  data?: Record<string, any>;
  sound?: 'default' | null;
  badge?: number;
  channelId?: string;
}

@Injectable()
export class PushNotificationsService {
  private readonly logger = new Logger(PushNotificationsService.name);
  private expo: Expo;

  constructor(private readonly pushTokensService: PushTokensService) {
    this.expo = new Expo();
  }

  /**
   * Sender push-notifikasjon til en spesifikk bruker
   */
  async sendToUser(userId: string, notification: PushNotificationData): Promise<void> {
    try {
      const userTokens = await this.pushTokensService.getUserTokens(userId);
      
      if (userTokens.length === 0) {
        this.logger.warn(`No push tokens found for user ${userId}`);
        return;
      }

      const messages = userTokens.map(token => this.createPushMessage(token.token, notification));
      await this.sendPushMessages(messages);
      
      this.logger.log(`Sent push notification to user ${userId} (${userTokens.length} devices)`);
    } catch (error) {
      this.logger.error(`Error sending push notification to user ${userId}:`, error);
    }
  }

  /**
   * Sender push-notifikasjon til flere brukere
   */
  async sendToUsers(userIds: string[], notification: PushNotificationData): Promise<void> {
    try {
      const allTokens = await this.pushTokensService.getUsersTokens(userIds);
      
      if (allTokens.length === 0) {
        this.logger.warn(`No push tokens found for users: ${userIds.join(', ')}`);
        return;
      }

      const messages = allTokens.map(token => this.createPushMessage(token.token, notification));
      await this.sendPushMessages(messages);
      
      this.logger.log(`Sent push notification to ${userIds.length} users (${allTokens.length} devices)`);
    } catch (error) {
      this.logger.error(`Error sending push notifications to users:`, error);
    }
  }

  /**
   * Sender push-notifikasjon til alle aktive brukere
   */
  async sendToAllUsers(notification: PushNotificationData): Promise<void> {
    try {
      // Dette krever en metode for å hente alle aktive tokens
      // For nå implementerer vi ikke dette
      this.logger.warn('sendToAllUsers not implemented yet');
    } catch (error) {
      this.logger.error('Error sending push notifications to all users:', error);
    }
  }

  /**
   * Sender skift-notifikasjon når nytt skift opprettes
   */
  async sendShiftNotification(shiftId: string, shiftData: any, userIds: string[]): Promise<void> {
    const notification: PushNotificationData = {
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

  /**
   * Sender skift-oppdatering notifikasjon
   */
  async sendShiftUpdateNotification(shiftId: string, shiftData: any, userIds: string[]): Promise<void> {
    const notification: PushNotificationData = {
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

  /**
   * Sender skift-avlysning notifikasjon
   */
  async sendShiftCancellationNotification(shiftId: string, shiftData: any, userIds: string[]): Promise<void> {
    const notification: PushNotificationData = {
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

  /**
   * Oppretter en push message for Expo
   */
  private createPushMessage(token: string, notification: PushNotificationData): ExpoPushMessage {
    const message: ExpoPushMessage = {
      to: token,
      sound: notification.sound || 'default',
      title: notification.title,
      body: notification.body,
      data: notification.data || {},
    };

    // Android-spesifikke innstillinger
    if (notification.channelId) {
      message.channelId = notification.channelId;
    }

    // iOS-spesifikke innstillinger
    if (notification.badge) {
      message.badge = notification.badge;
    }

    return message;
  }

  /**
   * Sender push messages via Expo
   */
  private async sendPushMessages(messages: ExpoPushMessage[]): Promise<void> {
    const chunks = this.expo.chunkPushNotifications(messages);
    const tickets: any[] = [];

    for (const chunk of chunks) {
      try {
        const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        this.logger.error('Error sending push notification chunk:', error);
      }
    }

    // Håndter feil og retry
    await this.handlePushTickets(tickets);
  }

  /**
   * Håndterer push tickets og retry for feilede notifikasjoner
   */
  private async handlePushTickets(tickets: any[]): Promise<void> {
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
          
          // Håndter feil - f.eks. deaktiver ugyldige tokens
          if (receipt.details?.error === 'DeviceNotRegistered') {
            // Token er ugyldig, deaktiver den
            this.logger.warn(`Device not registered for ticket ${receiptId}, token should be deactivated`);
          }
        }
      }
    } catch (error) {
      this.logger.error('Error handling push notification receipts:', error);
    }
  }
}
