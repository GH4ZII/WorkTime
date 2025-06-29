import { PrismaService } from '../prisma.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
export declare class ShiftsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateShiftDto): Promise<{
        id: string;
        userId: string;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        userId: string;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        userId: string;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, data: UpdateShiftDto): Promise<{
        id: string;
        userId: string;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        userId: string;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
