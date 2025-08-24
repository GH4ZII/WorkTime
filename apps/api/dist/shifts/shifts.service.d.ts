import { PrismaService } from '../prisma.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
export declare class ShiftsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateShiftDto): Promise<{
        id: string;
        userId: string | null;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
        isAvailableShift: boolean;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            name: string;
            email: string;
        } | null;
    } & {
        id: string;
        userId: string | null;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
        isAvailableShift: boolean;
    })[]>;
    findOne(id: string): Promise<{
        id: string;
        userId: string | null;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
        isAvailableShift: boolean;
    } | null>;
    update(id: string, data: UpdateShiftDto): Promise<{
        id: string;
        userId: string | null;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
        isAvailableShift: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        userId: string | null;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
        isAvailableShift: boolean;
    }>;
}
