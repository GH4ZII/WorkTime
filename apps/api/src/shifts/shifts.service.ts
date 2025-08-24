// apps/api/src/shifts/shifts.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // din Prisma-klient
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Injectable()
export class ShiftsService {
    constructor(private prisma: PrismaService) {}

    // 1) Lage nytt skift
    async create(data: CreateShiftDto) {
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
            return this.prisma.shift.create({ data: shiftData });
        }
        
        return this.prisma.shift.create({ data: data as any });
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
        return this.prisma.shift.update({
            where: { id },
            data,
        });
    }

    // 5) Slette et skift
    async remove(id: string) {
        return this.prisma.shift.delete({ where: { id } });
    }
}
