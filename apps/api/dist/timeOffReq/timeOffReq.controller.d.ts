import { TimeOffReqService } from "./timeOffReq.service";
import { CreateTimeOffRequestDto } from "./dto/create-timeoff-request.dto";
import { UpdateTimeOffRequestDto } from "./dto/update-timeoff-request.dto";
export declare class TimeOffReqController {
    private readonly service;
    constructor(service: TimeOffReqService);
    create(dto: CreateTimeOffRequestDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        isHidden: boolean;
    }>;
    findAll(): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        isHidden: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        isHidden: boolean;
    } | null>;
    update(id: string, dto: UpdateTimeOffRequestDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        isHidden: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        isHidden: boolean;
    }>;
    approve(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        isHidden: boolean;
    }>;
    reject(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        isHidden: boolean;
    }>;
    hide(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        isHidden: boolean;
    }>;
    hidePatch(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        isHidden: boolean;
    }>;
}
