import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { ChatGPTService } from './services/chatgpt.service';
import { PromptBuilder } from './services/prompt-builder.service';
import { ResponseParser } from './services/response-parser';
import { PrismaService } from '../prisma.service';
import { UsersModule } from '../users/users.module';
import { ShiftsModule } from '../shifts/shifts.module'; // ← Sjekk at denne er importert
import { TimeOffReqModule } from '../timeOffReq/timeOffReq.module';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    ShiftsModule, // ← Dette fungerer nå
    TimeOffReqModule, // ← Sjekk at denne er riktig
  ],
  controllers: [AiController],
  providers: [
    AiService,
    ChatGPTService,
    PromptBuilder,
    ResponseParser,
    PrismaService,
  ],
  exports: [AiService],
})
export class AiModule {}
