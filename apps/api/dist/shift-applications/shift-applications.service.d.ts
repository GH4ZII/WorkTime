import { PrismaService } from '../prisma.service';
import { CreateShiftApplicationDto } from './dto/create-shift-application.dto';
import { UpdateShiftApplicationDto } from './dto/update-shift-application.dto';
export declare class ShiftApplicationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createShiftApplicationDto: CreateShiftApplicationDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
        shift: {
            id: string;
            startTime: Date;
            endTime: Date;
            location: string | null;
            notes: string | null;
        };
    } & {
        message: string | null;
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
    }>;
    findAll(): Promise<({
        user: {
            id: string;
            name: string;
            email: string;
        };
        shift: {
            id: string;
            startTime: Date;
            endTime: Date;
            location: string | null;
            notes: string | null;
        };
    } & {
        message: string | null;
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
    })[]>;
    findOne(id: string): Promise<({
        user: {
            id: string;
            name: string;
            email: string;
        };
        shift: {
            id: string;
            startTime: Date;
            endTime: Date;
            location: string | null;
            notes: string | null;
        };
    } & {
        message: string | null;
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
    }) | null>;
    update(id: string, updateShiftApplicationDto: UpdateShiftApplicationDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
        shift: {
            id: string;
            startTime: Date;
            endTime: Date;
            location: string | null;
            notes: string | null;
        };
    } & {
        message: string | null;
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
    }>;
    remove(id: string): Promise<{
        message: string | null;
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
    }>;
    hide(id: string): Promise<{
        message: string | null;
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
    }>;
    findByUser(userId: string): Promise<({
        shift: {
            id: string;
            startTime: Date;
            endTime: Date;
            location: string | null;
            notes: string | null;
        };
    } & {
        message: string | null;
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
    })[]>;
    findByShift(shiftId: string): Promise<({
        user: {
            id: string;
            name: string;
            email: string;
        };
    } & {
        message: string | null;
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
    })[]>;
}
