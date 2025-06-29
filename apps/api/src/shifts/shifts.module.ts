// apps/api/src/shifts/shifts.module.ts
import { Module } from '@nestjs/common';
import { ShiftsController } from './shifts.controller';
import { ShiftsService } from './shifts.service';
import { PrismaService } from '../prisma.service'; // din Prisma-klient

@Module({
    controllers: [ShiftsController],
    providers: [ShiftsService, PrismaService],
})
export class ShiftsModule {}
