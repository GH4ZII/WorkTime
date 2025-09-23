import { TimeOffReqService } from "./timeOffReq.service";
import { CreateTimeOffRequestDto } from "./dto/create-timeoff-request.dto";
import { UpdateTimeOffRequestDto } from "./dto/update-timeoff-request.dto";
export declare class TimeOffReqController {
    private readonly service;
    constructor(service: TimeOffReqService);
    create(dto: CreateTimeOffRequestDto): Promise<{
        id: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    findAll(): Promise<{
        id: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    } | null>;
    update(id: string, dto: UpdateTimeOffRequestDto): Promise<{
        id: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    approve(id: string): Promise<{
        id: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    reject(id: string): Promise<{
        id: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    hide(id: string): Promise<{
        id: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    hidePatch(id: string): Promise<{
        id: string;
        fromDate: Date;
        toDate: Date;
        type: import(".prisma/client").$Enums.TimeOffType;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        isHidden: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
}
