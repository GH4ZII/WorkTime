import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
export declare class ShiftsController {
    private readonly service;
    constructor(service: ShiftsService);
    create(dto: CreateShiftDto): Promise<any>;
    findAll(): Promise<({
        user: {
            id: string;
            name: string;
            email: string;
        } | null;
    } & {
        id: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        isAvailableShift: boolean;
    })[]>;
    findOne(id: string): Promise<{
        id: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        isAvailableShift: boolean;
    } | null>;
    update(id: string, dto: UpdateShiftDto): Promise<{
        id: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        isAvailableShift: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
        startTime: Date;
        endTime: Date;
        location: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.ShiftStatus;
        createdBy: string;
        isAvailableShift: boolean;
    }>;
}
