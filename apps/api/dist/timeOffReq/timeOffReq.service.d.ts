import { PrismaService } from "../prisma.service";
import { CreateTimeOffRequestDto } from "./dto/create-timeoff-request.dto";
import { UpdateTimeOffRequestDto } from "./dto/update-timeoff-request.dto";
export declare class TimeOffReqService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateTimeOffRequestDto): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        status: import(".prisma/client").$Enums.RequestStatus;
        fromDate: Date;
        toDate: Date;
        reason: string | null;
        isHidden: boolean;
    }>;
    findAll(): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        status: import(".prisma/client").$Enums.RequestStatus;
        fromDate: Date;
        toDate: Date;
        reason: string | null;
        isHidden: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        status: import(".prisma/client").$Enums.RequestStatus;
        fromDate: Date;
        toDate: Date;
        reason: string | null;
        isHidden: boolean;
    } | null>;
    update(id: string, data: UpdateTimeOffRequestDto): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        status: import(".prisma/client").$Enums.RequestStatus;
        fromDate: Date;
        toDate: Date;
        reason: string | null;
        isHidden: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        status: import(".prisma/client").$Enums.RequestStatus;
        fromDate: Date;
        toDate: Date;
        reason: string | null;
        isHidden: boolean;
    }>;
    approve(id: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        status: import(".prisma/client").$Enums.RequestStatus;
        fromDate: Date;
        toDate: Date;
        reason: string | null;
        isHidden: boolean;
    }>;
    reject(id: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        status: import(".prisma/client").$Enums.RequestStatus;
        fromDate: Date;
        toDate: Date;
        reason: string | null;
        isHidden: boolean;
    }>;
    hide(id: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        status: import(".prisma/client").$Enums.RequestStatus;
        fromDate: Date;
        toDate: Date;
        reason: string | null;
        isHidden: boolean;
    }>;
}
