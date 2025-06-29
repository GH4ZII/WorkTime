import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShiftsModule} from "./shifts/shifts.module";

@Module({
  imports: [ShiftsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
