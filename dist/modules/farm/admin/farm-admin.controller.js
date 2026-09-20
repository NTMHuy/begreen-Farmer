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
exports.FarmAdminController = void 0;
const common_1 = require("@nestjs/common");
const farm_service_1 = require("../farm.service");
const query_farm_dto_1 = require("../dto/query-farm.dto");
let FarmAdminController = class FarmAdminController {
    farmService;
    constructor(farmService) {
        this.farmService = farmService;
    }
    async findAll(query) {
        const data = await this.farmService.findAll(query);
        return {
            success: true,
            message: 'Lấy danh sách Farm thành công',
            data,
        };
    }
    async findOne(id) {
        const data = await this.farmService.findOne(id);
        return {
            success: true,
            message: 'Lấy thông tin Farm thành công',
            data,
        };
    }
    async approve(id) {
        const data = await this.farmService.approve(id);
        return {
            success: true,
            message: 'Duyệt Farm thành công',
            data,
        };
    }
    async reject(id, note) {
        const data = await this.farmService.reject(id, note);
        return {
            success: true,
            message: 'Từ chối Farm thành công',
            data,
        };
    }
};
exports.FarmAdminController = FarmAdminController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_farm_dto_1.QueryFarmDto]),
    __metadata("design:returntype", Promise)
], FarmAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FarmAdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FarmAdminController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)(':id/reject'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('note')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], FarmAdminController.prototype, "reject", null);
exports.FarmAdminController = FarmAdminController = __decorate([
    (0, common_1.Controller)('admin/farms'),
    __metadata("design:paramtypes", [farm_service_1.FarmService])
], FarmAdminController);
//# sourceMappingURL=farm-admin.controller.js.map