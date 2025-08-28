// apps/api/src/shifts/shifts.module.ts
import { Module } from '@nestjs/common';
import { ShiftsController } from './shifts.controller';
import { ShiftsService } from './shifts.service';
import { PrismaService } from '../prisma.service';
import { PushNotificationsModule } from '../push-notifications/push-notifications.module';

@Module({
  imports: [PushNotificationsModule], // ← Import PushNotificationsModule
  controllers: [ShiftsController],
  providers: [ShiftsService, PrismaService],
  exports: [ShiftsService], // ← Eksporter ShiftsService
})
export class ShiftsModule {}
