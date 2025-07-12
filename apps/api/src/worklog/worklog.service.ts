import {BadRequestException, Injectable} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateWorklogDto } from './dto/create-worklog.dto';
import { UpdateWorklogDto } from './dto/update-worklog.dto';
import {Prisma} from "@prisma/client";

@Injectable()
export class WorklogService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateWorklogDto) {
        return this.prisma.workLog.create({
            data: {
                userId: dto.userId,
                shiftId: dto.shiftId!,
                startTime: dto.startTime,
                endTime: dto.endTime,
                notes: dto.notes,
            },
        });
    }

    async findAll() {
        return this.prisma.workLog.findMany();
    }

    async findOne(id: string) {
        const worklog = await this.prisma.workLog.findUnique({
            where: { id },
        });
        if (!worklog) {
            throw new Error(`Worklog with id: "${id}" found`);
        }
        return worklog;
    }

    async update(id: string, dto: UpdateWorklogDto) {
        const existingLog = await this.findOne(id);

        const dataToUpdate: Prisma.WorkLogUpdateInput = {
            notes: dto.notes,
            user: {
                connect: {
                    id: dto.userId,
                },
            },
            shift: {
                connect: {
                    id: dto.shiftId,
                },
            }
        };

        // Håndterer oppdatering av tid og gjenutregning av timer
        if (dto.startTime || dto.endTime) {
            const newStartTime = dto.startTime ? new Date(dto.startTime) : existingLog.startTime;
            const newEndTime = dto.endTime ? new Date(dto.endTime) : existingLog.endTime;

            if (newStartTime >= newEndTime) {
                throw new BadRequestException('Start time must be before end time.');
            }

            dataToUpdate.startTime = newStartTime;
            dataToUpdate.endTime = newEndTime;
        }

        return this.prisma.workLog.update({
            where: { id },
            data: dataToUpdate,
        });
    }

    async remove(id: string) {
        await this.findOne(id);
        return this.prisma.workLog.delete({
            where: { id },
        });
    }
}
