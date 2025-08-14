import { ChatGPTService } from './services/chatgpt.service';
import { PromptBuilder } from './services/prompt-builder.service';
export declare class AiService {
    private readonly chatGPTService;
    private readonly promptBuilder;
    constructor(chatGPTService: ChatGPTService, promptBuilder: PromptBuilder);
    generateMonthlySchedule(month: string): Promise<import("./services/chatgpt.service").ChatGPTResponse>;
}
