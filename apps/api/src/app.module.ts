import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShiftsModule} from "./shifts/shifts.module";
import { UsersModule} from "./users/users.module";
import { TimeOffReqModule } from "./timeOffReq/timeOffReq.module";
import { ShiftSwapReqModule } from "./shiftSwapReq/shiftSwapReq.module";
import { WorklogModule} from "./worklog/worklog.module";

@Module({
  imports: [ShiftsModule, UsersModule, TimeOffReqModule, ShiftSwapReqModule, WorklogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
