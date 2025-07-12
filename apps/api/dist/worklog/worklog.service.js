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
exports.WorklogService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let WorklogService = class WorklogService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.workLog.create({
            data: {
                userId: dto.userId,
                shiftId: dto.shiftId,
                startTime: dto.startTime,
                endTime: dto.endTime,
                notes: dto.notes,
            },
        });
    }
    async findAll() {
        return this.prisma.workLog.findMany();
    }
    async findOne(id) {
        const worklog = await this.prisma.workLog.findUnique({
            where: { id },
        });
        if (!worklog) {
            throw new Error(`Worklog with id: "${id}" found`);
        }
        return worklog;
    }
    async update(id, dto) {
        const existingLog = await this.findOne(id);
        const dataToUpdate = {
            notes: dto.notes,
            user: {
                connect: {
                    id: dto.userId,
                },
            },
            shift: {
                connect: {
                    id: dto.shiftId,
                },
            }
        };
        if (dto.startTime || dto.endTime) {
            const newStartTime = dto.startTime ? new Date(dto.startTime) : existingLog.startTime;
            const newEndTime = dto.endTime ? new Date(dto.endTime) : existingLog.endTime;
            if (newStartTime >= newEndTime) {
                throw new common_1.BadRequestException('Start time must be before end time.');
            }
            dataToUpdate.startTime = newStartTime;
            dataToUpdate.endTime = newEndTime;
        }
        return this.prisma.workLog.update({
            where: { id },
            data: dataToUpdate,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.workLog.delete({
            where: { id },
        });
    }
};
exports.WorklogService = WorklogService;
exports.WorklogService = WorklogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorklogService);
//# sourceMappingURL=worklog.service.js.map