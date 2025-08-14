import { ConfigService } from '@nestjs/config';
export interface ChatGPTOptions {
    model?: string;
    maxTokens?: number;
    temperature?: number;
    retryAttempts?: number;
}
export interface ChatGPTPrompt {
    role: 'system' | 'user' | 'assistant';
    content: string;
}
export interface ChatGPTResponse {
    content: string;
    usage: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
    };
    model: string;
}
export declare class ChatGPTService {
    private readonly logger;
    private readonly configService;
    private openai;
    private readonly defaultOptions;
    constructor(configService: ConfigService);
    private initializeOpenAI;
    generateSchedule(prompt: string, options?: ChatGPTOptions): Promise<ChatGPTResponse>;
    private isOpenAIAvailable;
    private callOpenAI;
    validatePrompt(prompt: string): boolean;
    getUsageStats(): {
        totalCalls: number;
        totalTokens: number;
    };
    testConnection(): Promise<boolean>;
}
