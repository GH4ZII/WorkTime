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
exports.ShiftApplicationsController = void 0;
const common_1 = require("@nestjs/common");
const shift_applications_service_1 = require("./shift-applications.service");
const create_shift_application_dto_1 = require("./dto/create-shift-application.dto");
const update_shift_application_dto_1 = require("./dto/update-shift-application.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ShiftApplicationsController = class ShiftApplicationsController {
    shiftApplicationsService;
    constructor(shiftApplicationsService) {
        this.shiftApplicationsService = shiftApplicationsService;
    }
    create(createShiftApplicationDto, req) {
        createShiftApplicationDto.userId = req.user.id;
        return this.shiftApplicationsService.create(createShiftApplicationDto);
    }
    findAll() {
        return this.shiftApplicationsService.findAll();
    }
    findMyApplications(req) {
        return this.shiftApplicationsService.findByUser(req.user.id);
    }
    findOne(id) {
        return this.shiftApplicationsService.findOne(id);
    }
    update(id, updateShiftApplicationDto) {
        return this.shiftApplicationsService.update(id, updateShiftApplicationDto);
    }
    remove(id) {
        return this.shiftApplicationsService.remove(id);
    }
    approve(id) {
        return this.shiftApplicationsService.update(id, { status: 'APPROVED' });
    }
    reject(id) {
        return this.shiftApplicationsService.update(id, { status: 'REJECTED' });
    }
};
exports.ShiftApplicationsController = ShiftApplicationsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shift_application_dto_1.CreateShiftApplicationDto, Object]),
    __metadata("design:returntype", void 0)
], ShiftApplicationsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ShiftApplicationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-applications'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ShiftApplicationsController.prototype, "findMyApplications", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShiftApplicationsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shift_application_dto_1.UpdateShiftApplicationDto]),
    __metadata("design:returntype", void 0)
], ShiftApplicationsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShiftApplicationsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShiftApplicationsController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ShiftApplicationsController.prototype, "reject", null);
exports.ShiftApplicationsController = ShiftApplicationsController = __decorate([
    (0, common_1.Controller)('shift-applications'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [shift_applications_service_1.ShiftApplicationsService])
], ShiftApplicationsController);
//# sourceMappingURL=shift-applications.controller.js.map