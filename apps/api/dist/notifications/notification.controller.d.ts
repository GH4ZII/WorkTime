import { CreateNotificationDto } from "./dto/create-notification.dto";
import { NotificationService } from "./notification.service";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
export declare class NotificationController {
    private readonly service;
    constructor(service: NotificationService);
    create(dto: CreateNotificationDto): Promise<{
        id: string;
        userId: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: Date;
    }>;
    findAllForUser(userId: string): Promise<{
        id: string;
        userId: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: Date;
    }[]>;
    updateReadStatus(id: string, updateDto: UpdateNotificationDto): Promise<{
        id: string;
        userId: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        userId: string;
        title: string;
        message: string;
        read: boolean;
        createdAt: Date;
    }>;
}
