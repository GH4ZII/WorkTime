import { CreateWorklogDto } from "./dto/create-worklog.dto";
import { UpdateWorklogDto } from "./dto/update-worklog.dto";
import { WorklogService } from "./worklog.service";
export declare class WorklogController {
    private readonly worklogService;
    constructor(worklogService: WorklogService);
    create(dto: CreateWorklogDto): Promise<{
        id: string;
        startTime: Date;
        endTime: Date;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        shiftId: string;
    }>;
    findAll(): Promise<{
        id: string;
        startTime: Date;
        endTime: Date;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        shiftId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        startTime: Date;
        endTime: Date;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        shiftId: string;
    }>;
    update(id: string, dto: UpdateWorklogDto): Promise<{
        id: string;
        startTime: Date;
        endTime: Date;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        shiftId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        startTime: Date;
        endTime: Date;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        shiftId: string;
    }>;
}
