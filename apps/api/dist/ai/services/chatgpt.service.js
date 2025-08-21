"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ChatGPTService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGPTService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const openai_1 = require("openai");
let ChatGPTService = ChatGPTService_1 = class ChatGPTService {
    logger = new common_1.Logger(ChatGPTService_1.name);
    configService;
    openai;
    defaultOptions = {
        model: 'gpt-5-mini',
        maxTokens: 32000,
        temperature: 0.7,
        retryAttempts: 3,
    };
    constructor(configService) {
        this.configService = configService;
        this.initializeOpenAI();
    }
    initializeOpenAI() {
        const apiKey = this.configService.get('OPENAI_API_KEY');
        if (!apiKey) {
            this.logger.warn('OPENAI_API_KEY ikke satt. AI-funksjonalitet vil ikke fungere.');
            return;
        }
        try {
            this.openai = new openai_1.default({
                apiKey: apiKey,
                maxRetries: this.defaultOptions.retryAttempts,
            });
            this.logger.log('OpenAI klient initialisert');
        }
        catch (error) {
            this.logger.error('Feil ved initialisering av OpenAI klient:', error);
        }
    }
    async generateSchedule(prompt, options) {
        const finalOptions = { ...this.defaultOptions, ...options };
        try {
            if (!this.isOpenAIAvailable()) {
                throw new Error('OpenAI API ikke tilgjengelig. Sjekk konfigurasjon.');
            }
            this.logger.log(`Genererer skiftplan med modell: ${finalOptions.model}`);
            return await this.callOpenAI(prompt, finalOptions);
        }
        catch (error) {
            this.logger.error('Feil ved generering av skiftplan:', error);
            throw new Error(`Kunne ikke generere skiftplan: ${error.message}`);
        }
    }
    isOpenAIAvailable() {
        const apiKey = this.configService.get('OPENAI_API_KEY');
        return !!apiKey && !!this.openai;
    }
    async callOpenAI(prompt, options) {
        try {
            this.logger.log('Starter OpenAI API-kall...');
            const model = options.model || this.defaultOptions.model || 'gpt-5-mini';
            const maxTokens = options.maxTokens || this.defaultOptions.maxTokens || 4000;
            this.logger.log(`Bruker modell: ${model}, maxTokens: ${maxTokens}`);
            this.logger.log('Prompt preview:', prompt.substring(0, 100) + '...');
            const completion = await this.openai.chat.completions.create({
                model: model,
                messages: [{ role: 'user', content: prompt }],
                max_completion_tokens: maxTokens,
            });
            this.logger.log('OpenAI raw response:', JSON.stringify(completion, null, 2));
            const response = {
                content: completion.choices[0].message.content || '',
                usage: {
                    promptTokens: completion.usage?.prompt_tokens || 0,
                    completionTokens: completion.usage?.completion_tokens || 0,
                    totalTokens: completion.usage?.total_tokens || 0
                },
                model: completion.model,
            };
            this.logger.log('Processed response:', JSON.stringify(response, null, 2));
            return response;
        }
        catch (error) {
            this.logger.error('OpenAI API feil:', error);
            throw new Error(`OpenAI API feil: ${error.message}`);
        }
    }
    validatePrompt(prompt) {
        const maxTokens = this.defaultOptions.maxTokens || 2000;
        const estimatedTokens = Math.ceil(prompt.length / 4);
        if (estimatedTokens > maxTokens) {
            this.logger.warn(`Prompt for lang: ${estimatedTokens} tokens (maks: ${maxTokens})`);
            return false;
        }
        return true;
    }
    getUsageStats() {
        return {
            totalCalls: 0,
            totalTokens: 0
        };
    }
    async testConnection() {
        try {
            const testPrompt = 'Test prompt for å verifisere OpenAI tilkobling';
            const response = await this.generateSchedule(testPrompt);
            this.logger.log(`Test response: ${JSON.stringify(response)}`);
            return !!response.content;
        }
        catch (error) {
            this.logger.error('Test av OpenAI tilkobling feilet:', error);
            return false;
        }
    }
};
exports.ChatGPTService = ChatGPTService;
exports.ChatGPTService = ChatGPTService = ChatGPTService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ChatGPTService);
//# sourceMappingURL=chatgpt.service.js.map