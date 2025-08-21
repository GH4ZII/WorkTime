import { ChatGPTService } from './services/chatgpt.service';
import { PromptBuilder, Employee, TimeOffRequest } from './services/prompt-builder.service';
export declare class AiService {
    private readonly chatGPTService;
    private readonly promptBuilder;
    private readonly logger;
    constructor(chatGPTService: ChatGPTService, promptBuilder: PromptBuilder);
    private getMonthNumber;
    private cleanJsonString;
    generateWeeklySchedule(weekStart: Date, weekEnd: Date, employees: Employee[], timeOffRequests: TimeOffRequest[]): Promise<any>;
    generateMonthlySchedule(month: string, year: number, employees: Employee[], timeOffRequests: TimeOffRequest[]): Promise<any>;
}
