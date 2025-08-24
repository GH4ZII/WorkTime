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
        id: string;
        userId: string;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        message: string | null;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
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
        id: string;
        userId: string;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        message: string | null;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
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
        id: string;
        userId: string;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        message: string | null;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
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
        id: string;
        userId: string;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        message: string | null;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
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
        id: string;
        userId: string;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        message: string | null;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        userId: string;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        message: string | null;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
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
        id: string;
        userId: string;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        message: string | null;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
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
        id: string;
        userId: string;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        message: string | null;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    hide(id: string): Promise<{
        id: string;
        userId: string;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        message: string | null;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    hidePatch(id: string): Promise<{
        id: string;
        userId: string;
        shiftId: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        message: string | null;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
