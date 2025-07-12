import {Controller, Get, Post, Put, Body, Param, Patch, Delete} from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { NotificationService } from "./notification.service";
import {UpdateNotificationDto} from "./dto/update-notification.dto";


@Controller('notifications')
export class NotificationController {
    constructor(private readonly service: NotificationService) {
    }

    @Post()
    create(@Body() dto: CreateNotificationDto) {
        return this.service.create(dto);
    }

    @Get('user/:userId')
    findAllForUser(@Param('userId') userId: string) {
        return this.service.findAllForUser(userId);
    }

    @Patch(':id/status')
    updateReadStatus(@Param('id') id: string,
                     @Body() updateDto: UpdateNotificationDto,
                     ) {
        return this.service.updateReadStatus(id, updateDto.read!);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
