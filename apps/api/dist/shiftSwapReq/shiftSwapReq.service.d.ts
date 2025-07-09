import { PrismaService } from '../prisma.service';
import { CreateShiftSwapRequestDto } from './dto/create-shiftswap-request.dto';
import { UpdateShiftSwapRequestDto } from "./dto/update-shiftswap-request.dto";
export declare class ShiftSwapReqService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateShiftSwapRequestDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        updatedAt: Date;
        reason: string | null;
        requestedById: string;
        fromShiftId: string;
        swapType: import(".prisma/client").$Enums.SwapRequestType;
        swapWithId: string | null;
        toShiftId: string | null;
        requestedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        updatedAt: Date;
        reason: string | null;
        requestedById: string;
        fromShiftId: string;
        swapType: import(".prisma/client").$Enums.SwapRequestType;
        swapWithId: string | null;
        toShiftId: string | null;
        requestedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        updatedAt: Date;
        reason: string | null;
        requestedById: string;
        fromShiftId: string;
        swapType: import(".prisma/client").$Enums.SwapRequestType;
        swapWithId: string | null;
        toShiftId: string | null;
        requestedAt: Date;
    } | null>;
    update(id: string, dto: UpdateShiftSwapRequestDto): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        updatedAt: Date;
        reason: string | null;
        requestedById: string;
        fromShiftId: string;
        swapType: import(".prisma/client").$Enums.SwapRequestType;
        swapWithId: string | null;
        toShiftId: string | null;
        requestedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        updatedAt: Date;
        reason: string | null;
        requestedById: string;
        fromShiftId: string;
        swapType: import(".prisma/client").$Enums.SwapRequestType;
        swapWithId: string | null;
        toShiftId: string | null;
        requestedAt: Date;
    }>;
}
