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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeOffReqService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TimeOffReqService = class TimeOffReqService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.timeOffRequest.create({
            data: {
                userId: data.userId,
                fromDate: new Date(data.fromDate),
                toDate: new Date(data.toDate),
                type: data.type,
                reason: data.reason,
            },
        });
    }
    async findAll() {
        return this.prisma.timeOffRequest.findMany();
    }
    async findOne(id) {
        return this.prisma.timeOffRequest.findUnique({
            where: { id },
        });
    }
    async update(id, data) {
        return this.prisma.timeOffRequest.update({
            where: { id },
            data: {
                userId: data.userId,
                fromDate: data.fromDate ? new Date(data.fromDate) : undefined,
                toDate: data.toDate ? new Date(data.toDate) : undefined,
                type: data.type,
                reason: data.reason,
            },
        });
    }
    async remove(id) {
        return this.prisma.timeOffRequest.delete({
            where: { id },
        });
    }
};
exports.TimeOffReqService = TimeOffReqService;
exports.TimeOffReqService = TimeOffReqService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TimeOffReqService);
//# sourceMappingURL=timeOffReq.service.js.map