import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShiftsModule} from "./shifts/shifts.module";
import { UsersModule} from "./users/users.module";
import { TimeOffReqModule } from "./timeOffReq/timeOffReq.module";
import { ShiftSwapReqModule } from "./shiftSwapReq/shiftSwapReq.module";
import { ShiftApplicationsModule } from "./shift-applications/shift-applications.module";
import { WorklogModule} from "./worklog/worklog.module";
import { NotificationModule} from "./notifications/notification.module";
import { AuthModule } from "./auth/auth.module";
import { ChatModule } from "./chat/chat.module";
import { AiModule } from "./ai/ai.module";

@Module({
  imports: [
    ShiftsModule, 
    UsersModule, 
    TimeOffReqModule, 
    ShiftSwapReqModule, 
    ShiftApplicationsModule,
    WorklogModule,
    NotificationModule, 
    AuthModule, 
    ChatModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
