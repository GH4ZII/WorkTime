import {Module} from '@nestjs/common';
import {WorklogController} from './worklog.controller';
import {WorklogService} from './worklog.service';
import {PrismaService} from '../prisma.service';

@Module({
    controllers: [WorklogController],
    providers: [WorklogService, PrismaService]
})

export class WorklogModule {}
