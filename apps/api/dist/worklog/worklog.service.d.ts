import { PrismaService } from '../prisma.service';
import { CreateWorklogDto } from './dto/create-worklog.dto';
import { UpdateWorklogDto } from './dto/update-worklog.dto';
export declare class WorklogService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateWorklogDto): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        shiftId: string;
        startTime: Date;
        endTime: Date;
        notes: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        shiftId: string;
        startTime: Date;
        endTime: Date;
        notes: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        shiftId: string;
        startTime: Date;
        endTime: Date;
        notes: string | null;
    }>;
    update(id: string, dto: UpdateWorklogDto): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        shiftId: string;
        startTime: Date;
        endTime: Date;
        notes: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        shiftId: string;
        startTime: Date;
        endTime: Date;
        notes: string | null;
    }>;
}
