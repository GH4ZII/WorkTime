import { Injectable} from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto} from "./dto/update-notification.dto";

@Injectable()
export class NotificationService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateNotificationDto) {
        return this.prisma.notification.create({
            data: {
                userId: data.userId,
                title: data.title,
                message: data.message,
            }
        })
    }

    async findAllForUser(userId: string) {
        return this.prisma.notification.findMany({
            where: { userId: userId },
            orderBy: { createdAt: 'desc' }
        })
    }

    async updateReadStatus(id: string, read: boolean) {
        return this.prisma.notification.update({
            where: { id: id},
            data: { read: read }
        })
    }

    async remove(id: string) {
        return this.prisma.notification.delete({
            where: { id: id}
        })
    }
}
