import { Module } from '@nestjs/common';
import { TimeOffReqController } from './timeOffReq.controller';
import { TimeOffReqService } from './timeOffReq.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [],
  controllers: [TimeOffReqController],
  providers: [TimeOffReqService, PrismaService],
  exports: [TimeOffReqService], // ← Sjekk at denne er her
})
export class TimeOffReqModule {}
