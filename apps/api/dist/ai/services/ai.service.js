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
var AiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const chatgpt_service_1 = require("./chatgpt.service");
const prompt_builder_1 = require("./prompt-builder");
let AiService = AiService_1 = class AiService {
    chatGPTService;
    promptBuilder;
    logger = new common_1.Logger(AiService_1.name);
    constructor(chatGPTService, promptBuilder) {
        this.chatGPTService = chatGPTService;
        this.promptBuilder = promptBuilder;
    }
    getMonthNumber(month) {
        const months = [
            'januar', 'februar', 'mars', 'april', 'mai', 'juni',
            'juli', 'august', 'september', 'oktober', 'november', 'desember'
        ];
        const monthIndex = months.findIndex(m => m.toLowerCase() === month.toLowerCase());
        return monthIndex >= 0 ? monthIndex : 0;
    }
    cleanJsonString(jsonString) {
        return jsonString
            .replace(/'([^']+)':/g, '"$1":')
            .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":')
            .replace(/,(\s*[}\]])/g, '$1')
            .replace(/\n\s*\n/g, '\n')
            .trim();
    }
    async generateMonthlySchedule(month, year, employees, timeOffRequests) {
        this.logger.log(`Generating shift plan for ${month} ${year} with ${employees.length} employees`);
        const monthDate = new Date(year, this.getMonthNumber(month), 1);
        const prompt = this.promptBuilder.buildMonthlySchedulePrompt(employees, timeOffRequests, monthDate, []);
        let lastError = null;
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                this.logger.log(`Attempt ${attempt} of 3`);
                const response = await this.chatGPTService.generateSchedule(prompt);
                if (response && response.content) {
                    try {
                        const jsonMatch = response.content.match(/```json\s*([\s\S]*?)\s*```/);
                        if (jsonMatch) {
                            const jsonContent = jsonMatch[1].trim();
                            const cleanedJson = this.cleanJsonString(jsonContent);
                            const schedule = JSON.parse(cleanedJson);
                            this.logger.log(`Shift plan generated on attempt ${attempt}`);
                            return schedule;
                        }
                        else {
                            const cleanedJson = this.cleanJsonString(response.content);
                            const schedule = JSON.parse(cleanedJson);
                            this.logger.log(`Shift plan generated on attempt ${attempt}`);
                            return schedule;
                        }
                    }
                    catch (parseError) {
                        this.logger.warn(`Attempt ${attempt} failed: Invalid JSON from AI: ${parseError.message}`);
                        lastError = parseError;
                        continue;
                    }
                }
                else {
                    this.logger.warn(`Attempt ${attempt} failed: Empty response from AI`);
                    lastError = new Error('Empty response from AI');
                    continue;
                }
            }
            catch (error) {
                this.logger.warn(`Attempt ${attempt} failed: ${error.message}`);
                lastError = error;
                continue;
            }
        }
        this.logger.error(`Could not generate valid shift plan after 3 attempts. Last error: ${lastError?.message || 'Unknown error'}`);
        throw new Error(`Could not generate valid shift plan after 3 attempts. Last error: ${lastError?.message || 'Unknown error'}`);
    }
};
exports.AiService = AiService;
exports.AiService = AiService = AiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [chatgpt_service_1.ChatGPTService,
        prompt_builder_1.PromptBuilder])
], AiService);
//# sourceMappingURL=ai.service.js.map