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
exports.WorklogController = void 0;
const common_1 = require("@nestjs/common");
const create_worklog_dto_1 = require("./dto/create-worklog.dto");
const update_worklog_dto_1 = require("./dto/update-worklog.dto");
const worklog_service_1 = require("./worklog.service");
let WorklogController = class WorklogController {
    worklogService;
    constructor(worklogService) {
        this.worklogService = worklogService;
    }
    create(dto) {
        return this.worklogService.create(dto);
    }
    findAll() {
        return this.worklogService.findAll();
    }
    findOne(id) {
        return this.worklogService.findOne(id);
    }
    update(id, dto) {
        return this.worklogService.update(id, dto);
    }
    remove(id) {
        return this.worklogService.remove(id);
    }
};
exports.WorklogController = WorklogController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_worklog_dto_1.CreateWorklogDto]),
    __metadata("design:returntype", void 0)
], WorklogController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WorklogController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorklogController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_worklog_dto_1.UpdateWorklogDto]),
    __metadata("design:returntype", void 0)
], WorklogController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorklogController.prototype, "remove", null);
exports.WorklogController = WorklogController = __decorate([
    (0, common_1.Controller)('worklog'),
    __metadata("design:paramtypes", [worklog_service_1.WorklogService])
], WorklogController);
//# sourceMappingURL=worklog.controller.js.map