import { TimeOffReqService } from "./timeOffReq.service";
import { CreateTimeOffRequestDto } from "./dto/create-timeoff-request.dto";
import { UpdateTimeOffRequestDto } from "./dto/update-timeoff-request.dto";
export declare class TimeOffReqController {
    private readonly service;
    constructor(service: TimeOffReqService);
    create(dto: CreateTimeOffRequestDto): Promise<{
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
    update(id: string, dto: UpdateTimeOffRequestDto): Promise<{
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
    hidePatch(id: string): Promise<{
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
