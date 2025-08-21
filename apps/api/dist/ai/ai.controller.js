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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiController = void 0;
const common_1 = require("@nestjs/common");
const chatgpt_service_1 = require("./services/chatgpt.service");
const prompt_builder_service_1 = require("./services/prompt-builder.service");
const users_service_1 = require("../users/users.service");
const timeOffReq_service_1 = require("../timeOffReq/timeOffReq.service");
const shifts_service_1 = require("../shifts/shifts.service");
let AiController = class AiController {
    chatGPTService;
    promptBuilder;
    usersService;
    shiftsService;
    timeOffReqService;
    constructor(chatGPTService, promptBuilder, usersService, shiftsService, timeOffReqService) {
        this.chatGPTService = chatGPTService;
        this.promptBuilder = promptBuilder;
        this.usersService = usersService;
        this.shiftsService = shiftsService;
        this.timeOffReqService = timeOffReqService;
    }
    async testConnection() {
        try {
            const isConnected = await this.chatGPTService.testConnection();
            return {
                success: true,
                connected: isConnected,
                message: isConnected ? 'OpenAI tilkobling OK' : 'OpenAI tilkobling feilet',
                timestamp: new Date().toISOString()
            };
        }
        catch (error) {
            return {
                success: false,
                connected: false,
                message: 'Test av tilkobling feilet',
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }
    async generateWeeklySchedule(body) {
        try {
            const weekStart = new Date(body.weekStart);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            const dbEmployees = await this.usersService.findAll();
            const dbTimeOffRequests = await this.timeOffReqService.findAll();
            const employees = dbEmployees.map(emp => ({
                id: emp.id,
                name: emp.name,
                role: emp.role,
                preferredShifts: [],
                positionPercentage: emp.positionPercentage || 100
            }));
            const timeOffRequests = dbTimeOffRequests.map(req => ({
                employeeId: req.userId,
                startDate: req.fromDate,
                endDate: req.toDate,
                type: this.convertTimeOffType(req.type),
                status: this.convertRequestStatus(req.status)
            }));
            const prompt = this.promptBuilder.buildWeeklySchedulePrompt(employees, timeOffRequests, weekStart, weekEnd);
            const aiResponse = await this.chatGPTService.generateSchedule(prompt);
            if (!aiResponse.content || aiResponse.content.trim() === '') {
                return { success: false, message: 'AI returnerte tomt svar' };
            }
            let schedule;
            let cleanedContent = '';
            try {
                let content = aiResponse.content;
                if (content.includes('```json')) {
                    content = content.replace(/```json\n?/, '').replace(/\n?```$/, '');
                }
                content = content.replace(/\/\/.*$/gm, '');
                content = content.replace(/\/\/.*?(?=\n|$)/g, '');
                content = content.replace(/^\s*[\r\n]/gm, '');
                content = content.replace(/,\s*\/\/.*?(?=\n|,|$)/g, '');
                cleanedContent = content;
                console.log('Renset AI-innhold (første 500 tegn):', cleanedContent.substring(0, 500) + '...');
                schedule = JSON.parse(cleanedContent);
            }
            catch (parseError) {
                console.error('Feil ved JSON parsing etter rensing:', parseError);
                console.error('Renset innhold (første 1000 tegn):', cleanedContent.substring(0, 1000) + '...');
                return {
                    success: false,
                    message: 'AI returnerte ugyldig JSON-format. Prøv igjen.',
                    error: parseError.message,
                    rawContent: cleanedContent.substring(0, 500) + '...'
                };
            }
            return {
                success: true,
                message: `Skiftplan generert med AI for uke ${weekStart.toLocaleDateString('nb-NO')} - ${weekEnd.toLocaleDateString('nb-NO')}`,
                shifts: schedule.shifts || [],
                summary: schedule.summary || {},
                weekStart: weekStart.toISOString(),
                weekEnd: weekEnd.toISOString(),
                employeeCount: employees.length
            };
        }
        catch (error) {
            console.error('Feil ved AI-generering:', error);
            return {
                success: false,
                message: 'Feil ved AI-generering',
                error: error.message
            };
        }
    }
    async generateMonthlySchedule(body) {
        try {
            const month = new Date(body.month);
            const dbEmployees = await this.usersService.findAll();
            const dbTimeOffRequests = await this.timeOffReqService.findAll();
            const employees = dbEmployees.map(emp => ({
                id: emp.id, name: emp.name, role: emp.role, preferredShifts: [], positionPercentage: emp.positionPercentage || 100
            }));
            const timeOffRequests = dbTimeOffRequests.map(req => ({
                employeeId: req.userId, startDate: req.fromDate, endDate: req.toDate,
                type: this.convertTimeOffType(req.type), status: this.convertRequestStatus(req.status)
            }));
            const prompt = this.promptBuilder.buildMonthlySchedulePrompt(employees, timeOffRequests, month, []);
            const aiResponse = await this.chatGPTService.generateSchedule(prompt);
            if (!aiResponse.content || aiResponse.content.trim() === '') {
                return { success: false, message: 'AI returnerte tomt svar' };
            }
            let schedule;
            let cleanedContent = '';
            try {
                let content = aiResponse.content;
                if (content.includes('```json')) {
                    content = content.replace(/```json\n?/, '').replace(/\n?```$/, '');
                }
                content = content.replace(/\/\/.*$/gm, '');
                content = content.replace(/\/\/.*?(?=\n|$)/g, '');
                content = content.replace(/^\s*[\r\n]/gm, '');
                content = content.replace(/,\s*\/\/.*?(?=\n|,|$)/g, '');
                cleanedContent = content;
                console.log('Renset AI-innhold (første 500 tegn):', cleanedContent.substring(0, 500) + '...');
                schedule = JSON.parse(cleanedContent);
            }
            catch (parseError) {
                console.error('Feil ved JSON parsing etter rensing:', parseError);
                console.error('Renset innhold (første 1000 tegn):', cleanedContent.substring(0, 1000) + '...');
                return {
                    success: false,
                    message: 'AI returnerte ugyldig JSON-format. Prøv igjen.',
                    error: parseError.message,
                    rawContent: cleanedContent.substring(0, 500) + '...'
                };
            }
            return {
                success: true,
                message: `Skiftplan generert med AI for ${employees.length} ansatte`,
                shifts: schedule.shifts || [],
                summary: schedule.summary || {},
                month: month.toLocaleDateString('nb-NO', { month: 'long', year: 'numeric' }),
                employeeCount: employees.length
            };
        }
        catch (error) {
            console.error('Feil ved AI-generering:', error);
            return {
                success: false,
                message: 'Feil ved AI-generering',
                error: error.message
            };
        }
    }
    async applySchedule(body) {
        try {
            if (!body.approved) {
                return {
                    success: false,
                    message: 'Skiftplan ikke godkjent'
                };
            }
            console.log('AI-genererte skift:', JSON.stringify(body.shifts, null, 2));
            const createdShifts = [];
            for (const aiShift of body.shifts) {
                try {
                    console.log(`Prøver å opprette skift for employeeId: ${aiShift.employeeId}`);
                    const shiftData = {
                        userId: aiShift.employeeId,
                        startTime: new Date(`${aiShift.date}T${aiShift.startTime}:00.000Z`).toISOString(),
                        endTime: new Date(`${aiShift.date}T${aiShift.endTime}:00.000Z`).toISOString(),
                        notes: `AI-generert: ${aiShift.shiftType}`,
                        createdBy: 'AI'
                    };
                    const createdShift = await this.shiftsService.create(shiftData);
                    createdShifts.push(createdShift);
                }
                catch (shiftError) {
                    console.error(`Feil ved opprettelse av skift for ${aiShift.employeeId}:`, shiftError);
                }
            }
            return {
                success: true,
                message: `Skiftplan godkjent og ${createdShifts.length} skift opprettet`,
                createdShifts: createdShifts.length,
                month: body.month
            };
        }
        catch (error) {
            console.error('Feil ved godkjenning av skiftplan:', error);
            return {
                success: false,
                message: `Feil: ${error.message}`,
                createdShifts: 0
            };
        }
    }
    async getEmployees() {
        return [];
    }
    async getTimeOffRequests(month) {
        return [];
    }
    parseScheduleResponse(content) {
        try {
            return JSON.parse(content);
        }
        catch (error) {
            throw new Error('Kunne ikke parse AI-respons');
        }
    }
    convertTimeOffType(dbType) {
        const typeMap = {
            'VACATION': 'VACATION',
            'SICK': 'SICK_LEAVE',
            'PERSONAL': 'PERSONAL_LEAVE',
            'MATERNITY': 'MATERNITY_LEAVE'
        };
        return typeMap[dbType] || 'PERSONAL_LEAVE';
    }
    convertRequestStatus(dbStatus) {
        const statusMap = {
            'APPROVED': 'APPROVED',
            'PENDING': 'PENDING',
            'REJECTED': 'REJECTED'
        };
        return statusMap[dbStatus] || 'PENDING';
    }
    mapShiftType(aiShiftType) {
        const shiftTypeMap = {
            'Morgenskift': 'MORNING',
            'Dagsift': 'DAY',
            'Ettermiddagsskift': 'EVENING',
            'Nattskift': 'NIGHT'
        };
        return shiftTypeMap[aiShiftType] || 'DAY';
    }
};
exports.AiController = AiController;
__decorate([
    (0, common_1.Get)('test-connection'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AiController.prototype, "testConnection", null);
__decorate([
    (0, common_1.Post)('generate-weekly-schedule'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "generateWeeklySchedule", null);
__decorate([
    (0, common_1.Post)('generate-monthly-schedule'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "generateMonthlySchedule", null);
__decorate([
    (0, common_1.Post)('apply-schedule'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "applySchedule", null);
exports.AiController = AiController = __decorate([
    (0, common_1.Controller)('ai'),
    __metadata("design:paramtypes", [chatgpt_service_1.ChatGPTService,
        prompt_builder_service_1.PromptBuilder,
        users_service_1.UsersService,
        shifts_service_1.ShiftsService,
        timeOffReq_service_1.TimeOffReqService])
], AiController);
//# sourceMappingURL=ai.controller.js.map