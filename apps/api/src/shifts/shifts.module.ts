// apps/api/src/shifts/shifts.module.ts
import { Module } from '@nestjs/common';
import { ShiftsController } from './shifts.controller';
import { ShiftsService } from './shifts.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [], // ← Fjern PrismaModule - den finnes ikke
  controllers: [ShiftsController],
  providers: [ShiftsService, PrismaService],
  exports: [ShiftsService], // ← Eksporter ShiftsService
})
export class ShiftsModule {}
