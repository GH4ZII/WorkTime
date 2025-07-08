"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftSwapReqModule = void 0;
const common_1 = require("@nestjs/common");
const shiftSwapReq_controller_1 = require("./shiftSwapReq.controller");
const shiftSwapReq_service_1 = require("./shiftSwapReq.service");
const prisma_service_1 = require("../prisma.service");
let ShiftSwapReqModule = class ShiftSwapReqModule {
};
exports.ShiftSwapReqModule = ShiftSwapReqModule;
exports.ShiftSwapReqModule = ShiftSwapReqModule = __decorate([
    (0, common_1.Module)({
        controllers: [shiftSwapReq_controller_1.ShiftSwapReqController],
        providers: [shiftSwapReq_service_1.ShiftSwapReqService, prisma_service_1.PrismaService]
    })
], ShiftSwapReqModule);
//# sourceMappingURL=shiftSwapReq.module.js.map