import { ShiftApplicationsService } from './shift-applications.service';
import { CreateShiftApplicationDto } from './dto/create-shift-application.dto';
import { UpdateShiftApplicationDto } from './dto/update-shift-application.dto';
export declare class ShiftApplicationsController {
    private readonly shiftApplicationsService;
    constructor(shiftApplicationsService: ShiftApplicationsService);
    create(createShiftApplicationDto: CreateShiftApplicationDto, req: any): Promise<{
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
    findMyApplications(req: any): Promise<({
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
    approve(id: string): Promise<{
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
    reject(id: string): Promise<{
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
    hidePatch(id: string): Promise<{
        message: string | null;
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
    }>;
}
