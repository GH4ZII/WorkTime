// apps/api/src/shifts/shifts.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // din Prisma-klient
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { PushNotificationsService } from '../push-notifications/push-notifications.service';

@Injectable()
export class ShiftsService {
    constructor(
        private prisma: PrismaService,
        private pushNotificationsService: PushNotificationsService
    ) {}

    // 1) Lage nytt skift
    async create(data: CreateShiftDto) {
        let shift;
        
        // Hvis det er et ledig skift, opprett data uten userId
        if (data.isAvailableShift || !data.userId) {
            const shiftData = {
                startTime: data.startTime,
                endTime: data.endTime,
                location: data.location,
                notes: data.notes,
                createdBy: data.createdBy,
                isAvailableShift: true
            } as any;
            shift = await this.prisma.shift.create({ data: shiftData });
        } else {
            shift = await this.prisma.shift.create({ data: data as any });
            
            // Send push notification til brukeren som fikk tildelt skiftet
            if (data.userId) {
                try {
                    await this.pushNotificationsService.sendShiftNotification(
                        shift.id,
                        shift,
                        [data.userId]
                    );
                } catch (error) {
                    console.error('Failed to send shift notification:', error);
                }
            }
        }
        
        return shift;
    }

    // 2) Hente alle skift
    async findAll() {
        return this.prisma.shift.findMany({
            include: {
                user: { select: { id: true, name: true, email: true } },
            },
        });
    }

    // 3) Hente ett skift på ID
    async findOne(id: string) {
        return this.prisma.shift.findUnique({ where: { id } });
    }

    // 4) Endre et skift
    async update(id: string, data: UpdateShiftDto) {
        const oldShift = await this.prisma.shift.findUnique({ where: { id } });
        const updatedShift = await this.prisma.shift.update({
            where: { id },
            data,
        });

        // Send push notification hvis skiftet har en bruker
        if (updatedShift.userId && oldShift) {
            try {
                await this.pushNotificationsService.sendShiftUpdateNotification(
                    updatedShift.id,
                    updatedShift,
                    [updatedShift.userId]
                );
            } catch (error) {
                console.error('Failed to send shift update notification:', error);
            }
        }

        return updatedShift;
    }

    // 5) Slette et skift
    async remove(id: string) {
        const shift = await this.prisma.shift.findUnique({ where: { id } });
        
        if (shift?.userId) {
            try {
                await this.pushNotificationsService.sendShiftCancellationNotification(
                    shift.id,
                    shift,
                    [shift.userId]
                );
            } catch (error) {
                console.error('Failed to send shift cancellation notification:', error);
            }
        }

        return this.prisma.shift.delete({ where: { id } });
    }

    // 6) Tildel skift til bruker
    async assignShift(shiftId: string, userId: string) {
        const shift = await this.prisma.shift.update({
            where: { id: shiftId },
            data: { userId, isAvailableShift: false },
        });

        // Send push notification til brukeren som fikk tildelt skiftet
        try {
            await this.pushNotificationsService.sendShiftNotification(
                shift.id,
                shift,
                [userId]
            );
        } catch (error) {
            console.error('Failed to send shift assignment notification:', error);
        }

        return shift;
    }

    // 7) Gjør skift tilgjengelig (fjern tildeling)
    async makeAvailable(shiftId: string) {
        const shift = await this.prisma.shift.findUnique({ where: { id: shiftId } });
        
        if (shift?.userId) {
            try {
                await this.pushNotificationsService.sendShiftCancellationNotification(
                    shift.id,
                    shift,
                    [shift.userId]
                );
            } catch (error) {
                console.error('Failed to send shift cancellation notification:', error);
            }
        }

        return this.prisma.shift.update({
            where: { id: shiftId },
            data: { userId: null, isAvailableShift: true },
        });
    }
}
