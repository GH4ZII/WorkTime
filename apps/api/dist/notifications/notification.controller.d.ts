import { CreateNotificationDto } from "./dto/create-notification.dto";
import { NotificationService } from "./notification.service";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
export declare class NotificationController {
    private readonly service;
    constructor(service: NotificationService);
    create(dto: CreateNotificationDto): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        title: string;
        read: boolean;
    }>;
    findAllForUser(userId: string): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        title: string;
        read: boolean;
    }[]>;
    updateReadStatus(id: string, updateDto: UpdateNotificationDto): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        title: string;
        read: boolean;
    }>;
    remove(id: string): Promise<{
        message: string;
        id: string;
        createdAt: Date;
        userId: string;
        title: string;
        read: boolean;
    }>;
}
