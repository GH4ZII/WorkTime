import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
export declare class ShiftsController {
    private readonly service;
    constructor(service: ShiftsService);
    create(dto: CreateShiftDto): Promise<{
        id: string;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
        isAvailableShift: boolean;
        userId: string | null;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            name: string;
            email: string;
        } | null;
    } & {
        id: string;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
        isAvailableShift: boolean;
        userId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        id: string;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
        isAvailableShift: boolean;
        userId: string | null;
    } | null>;
    update(id: string, dto: UpdateShiftDto): Promise<{
        id: string;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
        isAvailableShift: boolean;
        userId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        createdAt: Date;
        updatedAt: Date;
        isAvailableShift: boolean;
        userId: string | null;
    }>;
}
