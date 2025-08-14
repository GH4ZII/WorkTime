"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ai_controller_1 = require("./ai.controller");
const ai_service_1 = require("./ai.service");
const chatgpt_service_1 = require("./services/chatgpt.service");
const prompt_builder_service_1 = require("./services/prompt-builder.service");
const response_parser_1 = require("./services/response-parser");
const prisma_service_1 = require("../prisma.service");
const users_module_1 = require("../users/users.module");
const shifts_module_1 = require("../shifts/shifts.module");
const timeOffReq_module_1 = require("../timeOffReq/timeOffReq.module");
let AiModule = class AiModule {
};
exports.AiModule = AiModule;
exports.AiModule = AiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            users_module_1.UsersModule,
            shifts_module_1.ShiftsModule,
            timeOffReq_module_1.TimeOffReqModule,
        ],
        controllers: [ai_controller_1.AiController],
        providers: [
            ai_service_1.AiService,
            chatgpt_service_1.ChatGPTService,
            prompt_builder_service_1.PromptBuilder,
            response_parser_1.ResponseParser,
            prisma_service_1.PrismaService,
        ],
        exports: [ai_service_1.AiService],
    })
], AiModule);
//# sourceMappingURL=ai.module.js.map