import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShiftsModule} from "./shifts/shifts.module";
import { UsersModule} from "./users/users.module";

@Module({
  imports: [ShiftsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
