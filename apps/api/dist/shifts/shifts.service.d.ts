import { PrismaService } from '../prisma.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { PushNotificationsService } from '../push-notifications/push-notifications.service';
export declare class ShiftsService {
    private prisma;
    private pushNotificationsService;
    constructor(prisma: PrismaService, pushNotificationsService: PushNotificationsService);
    create(data: CreateShiftDto): Promise<any>;
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
    update(id: string, data: UpdateShiftDto): Promise<{
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
    assignShift(shiftId: string, userId: string): Promise<{
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
    makeAvailable(shiftId: string): Promise<{
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
