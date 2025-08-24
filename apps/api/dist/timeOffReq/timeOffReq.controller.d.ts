import { TimeOffReqService } from "./timeOffReq.service";
import { CreateTimeOffRequestDto } from "./dto/create-timeoff-request.dto";
import { UpdateTimeOffRequestDto } from "./dto/update-timeoff-request.dto";
export declare class TimeOffReqController {
    private readonly service;
    constructor(service: TimeOffReqService);
    create(dto: CreateTimeOffRequestDto): Promise<{
        id: string;
        userId: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        userId: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        userId: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, dto: UpdateTimeOffRequestDto): Promise<{
        id: string;
        userId: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        userId: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    approve(id: string): Promise<{
        id: string;
        userId: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    reject(id: string): Promise<{
        id: string;
        userId: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    hide(id: string): Promise<{
        id: string;
        userId: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    hidePatch(id: string): Promise<{
        id: string;
        userId: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
