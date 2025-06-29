import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
export declare class ShiftsController {
    private readonly service;
    constructor(service: ShiftsService);
    create(dto: CreateShiftDto): Promise<{
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
    update(id: string, dto: UpdateShiftDto): Promise<{
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
