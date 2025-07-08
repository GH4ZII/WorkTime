import {Module} from '@nestjs/common';
import {ShiftSwapReqController} from './shiftSwapReq.controller';
import {ShiftSwapReqService} from './shiftSwapReq.service';
import {PrismaService} from '../prisma.service';

@Module({
    controllers: [ShiftSwapReqController],
    providers: [ShiftSwapReqService, PrismaService]
})

export class ShiftSwapReqModule {}
