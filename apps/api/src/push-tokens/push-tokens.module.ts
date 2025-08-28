import { Module } from '@nestjs/common';
import { PushTokensController } from './push-tokens.controller';
import { PushTokensService } from './push-tokens.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PushTokensController],
  providers: [PushTokensService, PrismaService],
  exports: [PushTokensService],
})
export class PushTokensModule {}
