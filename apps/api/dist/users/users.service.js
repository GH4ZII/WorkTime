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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                passwordHash: await bcrypt.hash(data.password, 10),
                phone: data.phone,
                role: data.role,
                hireDate: data.hireDate ? new Date(data.hireDate) : new Date(),
            },
        });
    }
    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                hireDate: true,
            },
            orderBy: {
                name: 'asc',
            },
        });
    }
    async findOne(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    async update(id, data) {
        const updateData = { ...data };
        if (updateData.hireDate) {
            updateData.hireDate = new Date(updateData.hireDate).toISOString();
        }
        return this.prisma.user.update({
            where: { id },
            data: updateData
        });
    }
    async remove(id) {
        return this.prisma.user.delete({ where: { id } });
    }
    async findOneByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async updatePassword(id, newPasswordHash) {
        return this.prisma.user.update({
            where: { id },
            data: {
                passwordHash: newPasswordHash,
            },
        });
    }
    async savePasswordResetToken(id, token, expires) {
        return this.prisma.user.update({
            where: { id },
            data: {
                passwordResetToken: token,
                passwordResetExpires: expires,
            },
        });
    }
    async findByPasswordResetToken(token) {
        return this.prisma.user.findFirst({
            where: {
                passwordResetToken: token,
                passwordResetExpires: {
                    gt: new Date(),
                },
            },
        });
    }
    async clearPasswordResetToken(id) {
        return this.prisma.user.update({
            where: { id },
            data: {
                passwordResetToken: null,
                passwordResetExpires: null,
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map