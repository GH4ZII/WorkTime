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
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        isHidden: boolean;
        shiftId: string;
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
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        isHidden: boolean;
        shiftId: string;
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
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        isHidden: boolean;
        shiftId: string;
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
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        isHidden: boolean;
        shiftId: string;
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
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        isHidden: boolean;
        shiftId: string;
    }>;
    remove(id: string): Promise<{
        message: string | null;
        id: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        isHidden: boolean;
        shiftId: string;
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
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        isHidden: boolean;
        shiftId: string;
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
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        isHidden: boolean;
        shiftId: string;
    }>;
    hide(id: string): Promise<{
        message: string | null;
        id: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        isHidden: boolean;
        shiftId: string;
    }>;
    hidePatch(id: string): Promise<{
        message: string | null;
        id: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        isHidden: boolean;
        shiftId: string;
    }>;
}
