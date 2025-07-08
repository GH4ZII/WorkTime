import {Module} from "@nestjs/common";
import {TimeOffReqController} from "./timeOffReq.controller";
import {TimeOffReqService} from "./timeOffReq.service";
import {PrismaService} from "../prisma.service";

@Module({
    controllers: [TimeOffReqController],
    providers: [TimeOffReqService, PrismaService],
})

export class TimeOffReqModule {}
