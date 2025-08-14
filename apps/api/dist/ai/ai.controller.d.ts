import { ChatGPTService } from './services/chatgpt.service';
import { PromptBuilder } from './services/prompt-builder.service';
import { UsersService } from '../users/users.service';
import { TimeOffReqService } from '../timeOffReq/timeOffReq.service';
import { ShiftsService } from '../shifts/shifts.service';
export declare class AiController {
    private readonly chatGPTService;
    private readonly promptBuilder;
    private readonly usersService;
    private readonly shiftsService;
    private readonly timeOffReqService;
    constructor(chatGPTService: ChatGPTService, promptBuilder: PromptBuilder, usersService: UsersService, shiftsService: ShiftsService, timeOffReqService: TimeOffReqService);
    testConnection(): Promise<{
        success: boolean;
        connected: boolean;
        message: string;
        timestamp: string;
        error?: undefined;
    } | {
        success: boolean;
        connected: boolean;
        message: string;
        error: any;
        timestamp: string;
    }>;
    generateMonthlySchedule(body: {
        month: string;
    }): Promise<{
        success: boolean;
        message: string;
        error?: undefined;
        rawContent?: undefined;
        shifts?: undefined;
        summary?: undefined;
        month?: undefined;
        employeeCount?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        rawContent: string;
        shifts?: undefined;
        summary?: undefined;
        month?: undefined;
        employeeCount?: undefined;
    } | {
        success: boolean;
        message: string;
        shifts: any;
        summary: any;
        month: string;
        employeeCount: number;
        error?: undefined;
        rawContent?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        rawContent?: undefined;
        shifts?: undefined;
        summary?: undefined;
        month?: undefined;
        employeeCount?: undefined;
    }>;
    applySchedule(body: {
        shifts: any[];
        month: string;
        approved: boolean;
    }): Promise<{
        success: boolean;
        message: string;
        createdShifts?: undefined;
        month?: undefined;
    } | {
        success: boolean;
        message: string;
        createdShifts: number;
        month: string;
    } | {
        success: boolean;
        message: string;
        createdShifts: number;
        month?: undefined;
    }>;
    private getEmployees;
    private getTimeOffRequests;
    private parseScheduleResponse;
    private convertTimeOffType;
    private convertRequestStatus;
    private mapShiftType;
}
