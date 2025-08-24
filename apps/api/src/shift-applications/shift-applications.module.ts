import { Module } from '@nestjs/common';
import { ShiftApplicationsController } from './shift-applications.controller';
import { ShiftApplicationsService } from './shift-applications.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ShiftApplicationsController],
  providers: [ShiftApplicationsService, PrismaService],
  exports: [ShiftApplicationsService],
})
export class ShiftApplicationsModule {}
