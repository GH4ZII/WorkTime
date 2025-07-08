import { PrismaService } from '../prisma.service';
import { CreateShiftSwapRequestDto } from './dto/create-shiftswap-request.dto';
import { UpdateShiftSwapRequestDto } from "./dto/update-shiftswap-request.dto";
export declare class ShiftSwapReqService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateShiftSwapRequestDto): Promise<{
        id: string;
        requestedById: string;
        fromShiftId: string;
        swapType: import(".prisma/client").$Enums.SwapRequestType;
        swapWithId: string | null;
        toShiftId: string | null;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        requestedAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        requestedById: string;
        fromShiftId: string;
        swapType: import(".prisma/client").$Enums.SwapRequestType;
        swapWithId: string | null;
        toShiftId: string | null;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        requestedAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        requestedById: string;
        fromShiftId: string;
        swapType: import(".prisma/client").$Enums.SwapRequestType;
        swapWithId: string | null;
        toShiftId: string | null;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        requestedAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, dto: UpdateShiftSwapRequestDto): Promise<{
        id: string;
        requestedById: string;
        fromShiftId: string;
        swapType: import(".prisma/client").$Enums.SwapRequestType;
        swapWithId: string | null;
        toShiftId: string | null;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        requestedAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        requestedById: string;
        fromShiftId: string;
        swapType: import(".prisma/client").$Enums.SwapRequestType;
        swapWithId: string | null;
        toShiftId: string | null;
        reason: string | null;
        status: import(".prisma/client").$Enums.RequestStatus;
        requestedAt: Date;
        updatedAt: Date;
    }>;
}
