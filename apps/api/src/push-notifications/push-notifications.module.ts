import { Module } from '@nestjs/common';
import { PushNotificationsService } from './push-notifications.service';
import { PushTokensModule } from '../push-tokens/push-tokens.module';

@Module({
  imports: [PushTokensModule],
  providers: [PushNotificationsService],
  exports: [PushNotificationsService],
})
export class PushNotificationsModule {}
