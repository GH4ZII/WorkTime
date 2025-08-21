import { ChatGPTService } from './chatgpt.service';
import { PromptBuilder, Employee, TimeOffRequest } from './prompt-builder';
export declare class AiService {
    private readonly chatGPTService;
    private readonly promptBuilder;
    private readonly logger;
    constructor(chatGPTService: ChatGPTService, promptBuilder: PromptBuilder);
    private getMonthNumber;
    private cleanJsonString;
    generateMonthlySchedule(month: string, year: number, employees: Employee[], timeOffRequests: TimeOffRequest[]): Promise<any>;
}
