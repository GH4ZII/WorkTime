import { PrismaService } from "../prisma.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
export declare class NotificationService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateNotificationDto): Promise<{
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
    updateReadStatus(id: string, read: boolean): Promise<{
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
