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
exports.ShiftsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const push_notifications_service_1 = require("../push-notifications/push-notifications.service");
let ShiftsService = class ShiftsService {
    prisma;
    pushNotificationsService;
    constructor(prisma, pushNotificationsService) {
        this.prisma = prisma;
        this.pushNotificationsService = pushNotificationsService;
    }
    async create(data) {
        let shift;
        if (data.isAvailableShift || !data.userId) {
            const shiftData = {
                startTime: data.startTime,
                endTime: data.endTime,
                location: data.location,
                notes: data.notes,
                createdBy: data.createdBy,
                isAvailableShift: true
            };
            shift = await this.prisma.shift.create({ data: shiftData });
        }
        else {
            shift = await this.prisma.shift.create({ data: data });
            if (data.userId) {
                try {
                    await this.pushNotificationsService.sendShiftNotification(shift.id, shift, [data.userId]);
                }
                catch (error) {
                    console.error('Failed to send shift notification:', error);
                }
            }
        }
        return shift;
    }
    async findAll() {
        return this.prisma.shift.findMany({
            include: {
                user: { select: { id: true, name: true, email: true } },
            },
        });
    }
    async findOne(id) {
        return this.prisma.shift.findUnique({ where: { id } });
    }
    async update(id, data) {
        const oldShift = await this.prisma.shift.findUnique({ where: { id } });
        const updatedShift = await this.prisma.shift.update({
            where: { id },
            data,
        });
        if (updatedShift.userId && oldShift) {
            try {
                await this.pushNotificationsService.sendShiftUpdateNotification(updatedShift.id, updatedShift, [updatedShift.userId]);
            }
            catch (error) {
                console.error('Failed to send shift update notification:', error);
            }
        }
        return updatedShift;
    }
    async remove(id) {
        const shift = await this.prisma.shift.findUnique({ where: { id } });
        if (shift?.userId) {
            try {
                await this.pushNotificationsService.sendShiftCancellationNotification(shift.id, shift, [shift.userId]);
            }
            catch (error) {
                console.error('Failed to send shift cancellation notification:', error);
            }
        }
        return this.prisma.shift.delete({ where: { id } });
    }
    async assignShift(shiftId, userId) {
        const shift = await this.prisma.shift.update({
            where: { id: shiftId },
            data: { userId, isAvailableShift: false },
        });
        try {
            await this.pushNotificationsService.sendShiftNotification(shift.id, shift, [userId]);
        }
        catch (error) {
            console.error('Failed to send shift assignment notification:', error);
        }
        return shift;
    }
    async makeAvailable(shiftId) {
        const shift = await this.prisma.shift.findUnique({ where: { id: shiftId } });
        if (shift?.userId) {
            try {
                await this.pushNotificationsService.sendShiftCancellationNotification(shift.id, shift, [shift.userId]);
            }
            catch (error) {
                console.error('Failed to send shift cancellation notification:', error);
            }
        }
        return this.prisma.shift.update({
            where: { id: shiftId },
            data: { userId: null, isAvailableShift: true },
        });
    }
};
exports.ShiftsService = ShiftsService;
exports.ShiftsService = ShiftsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        push_notifications_service_1.PushNotificationsService])
], ShiftsService);
//# sourceMappingURL=shifts.service.js.map