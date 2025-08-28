import { PrismaService } from "../prisma.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
export declare class NotificationService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateNotificationDto): Promise<{
        message: string;
        id: string;
        userId: string;
        createdAt: Date;
        title: string;
        read: boolean;
    }>;
    findAllForUser(userId: string): Promise<{
        message: string;
        id: string;
        userId: string;
        createdAt: Date;
        title: string;
        read: boolean;
    }[]>;
    updateReadStatus(id: string, read: boolean): Promise<{
        message: string;
        id: string;
        userId: string;
        createdAt: Date;
        title: string;
        read: boolean;
    }>;
    remove(id: string): Promise<{
        message: string;
        id: string;
        userId: string;
        createdAt: Date;
        title: string;
        read: boolean;
    }>;
}
