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
exports.ShiftApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ShiftApplicationsService = class ShiftApplicationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createShiftApplicationDto) {
        return this.prisma.shiftApplication.create({
            data: createShiftApplicationDto,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                shift: {
                    select: {
                        id: true,
                        startTime: true,
                        endTime: true,
                        location: true,
                        notes: true,
                    },
                },
            },
        });
    }
    async findAll() {
        return this.prisma.shiftApplication.findMany({
            where: { isHidden: false },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                shift: {
                    select: {
                        id: true,
                        startTime: true,
                        endTime: true,
                        location: true,
                        notes: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findOne(id) {
        return this.prisma.shiftApplication.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                shift: {
                    select: {
                        id: true,
                        startTime: true,
                        endTime: true,
                        location: true,
                        notes: true,
                    },
                },
            },
        });
    }
    async update(id, updateShiftApplicationDto) {
        const updated = await this.prisma.shiftApplication.update({
            where: { id },
            data: updateShiftApplicationDto,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                shift: {
                    select: {
                        id: true,
                        startTime: true,
                        endTime: true,
                        location: true,
                        notes: true,
                    },
                },
            },
        });
        if (updateShiftApplicationDto.status === 'APPROVED') {
            await this.prisma.shift.update({
                where: { id: updated.shiftId },
                data: {
                    userId: updated.userId,
                    isAvailableShift: false,
                },
            });
        }
        return updated;
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.shiftApplication.update({
            where: { id },
            data: { isHidden: true }
        });
    }
    async hide(id) {
        const application = await this.findOne(id);
        if (!application) {
            throw new Error('Søknad ikke funnet');
        }
        return this.prisma.shiftApplication.update({
            where: { id },
            data: { isHidden: true }
        });
    }
    async findByUser(userId) {
        return this.prisma.shiftApplication.findMany({
            where: {
                userId,
                isHidden: false
            },
            include: {
                shift: {
                    select: {
                        id: true,
                        startTime: true,
                        endTime: true,
                        location: true,
                        notes: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findByShift(shiftId) {
        return this.prisma.shiftApplication.findMany({
            where: {
                shiftId,
                isHidden: false
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
};
exports.ShiftApplicationsService = ShiftApplicationsService;
exports.ShiftApplicationsService = ShiftApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShiftApplicationsService);
//# sourceMappingURL=shift-applications.service.js.map