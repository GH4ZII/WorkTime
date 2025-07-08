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
exports.ShiftSwapReqService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client");
let ShiftSwapReqService = class ShiftSwapReqService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        if (dto.type === client_1.SwapRequestType.SWAP) {
            if (!dto.swapWithId || !dto.toShiftId) {
                throw new common_1.BadRequestException('Ved SWAP må swapWithId og toShiftId oppgis.');
            }
        }
        const data = {
            requestedById: dto.userId,
            fromShiftId: dto.fromShiftId,
            swapType: dto.type,
            reason: dto.reason ?? null,
        };
        if (dto.type === client_1.SwapRequestType.SWAP) {
            data.swapWithId = dto.swapWithId;
            data.toShiftId = dto.toShiftId;
        }
        return this.prisma.shiftSwapRequest.create({ data });
    }
    async findAll() {
        return this.prisma.shiftSwapRequest.findMany();
    }
    async findOne(id) {
        return this.prisma.shiftSwapRequest.findUnique({
            where: { id },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        const data = {};
        if (dto.status) {
            data.status = dto.status;
        }
        if (dto.swapWithId !== undefined) {
            data.swapWithId = dto.swapWithId;
        }
        if (dto.toShiftId !== undefined) {
            data.toShiftId = dto.toShiftId;
        }
        if (dto.reason !== undefined) {
            data.reason = dto.reason;
        }
        return this.prisma.shiftSwapRequest.update({
            where: { id },
            data,
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.shiftSwapRequest.delete({
            where: { id },
        });
    }
};
exports.ShiftSwapReqService = ShiftSwapReqService;
exports.ShiftSwapReqService = ShiftSwapReqService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShiftSwapReqService);
//# sourceMappingURL=shiftSwapReq.service.js.map