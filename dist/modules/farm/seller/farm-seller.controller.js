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
exports.FarmSellerController = void 0;
const common_1 = require("@nestjs/common");
const farm_service_1 = require("../farm.service");
const create_farm_dto_1 = require("../dto/create-farm.dto");
const update_farm_dto_1 = require("../dto/update-farm.dto");
const query_farm_dto_1 = require("../dto/query-farm.dto");
let FarmSellerController = class FarmSellerController {
    farmService;
    constructor(farmService) {
        this.farmService = farmService;
    }
    async create(dto) {
        const data = await this.farmService.create(dto);
        return {
            success: true,
            message: 'Tạo Farm thành công',
            data,
        };
    }
    async findAll(sellerId, query) {
        const data = await this.farmService.findAllBySeller(sellerId, query);
        return {
            success: true,
            message: 'Lấy danh sách Farm thành công',
            data,
        };
    }
    async findOne(id, sellerId) {
        const data = await this.farmService.findOneBySeller(id, sellerId);
        return {
            success: true,
            message: 'Lấy Farm thành công',
            data,
        };
    }
    async update(id, sellerId, dto) {
        const data = await this.farmService.updateBySeller(id, sellerId, dto);
        return {
            success: true,
            message: 'Cập nhật Farm thành công',
            data,
        };
    }
    async remove(id, sellerId) {
        await this.farmService.removeBySeller(id, sellerId);
        return {
            success: true,
            message: 'Xóa Farm thành công',
        };
    }
};
exports.FarmSellerController = FarmSellerController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_farm_dto_1.CreateFarmDto]),
    __metadata("design:returntype", Promise)
], FarmSellerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('seller_id', new common_1.DefaultValuePipe(2), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, query_farm_dto_1.QueryFarmDto]),
    __metadata("design:returntype", Promise)
], FarmSellerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('seller_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], FarmSellerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('seller_id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_farm_dto_1.UpdateFarmDto]),
    __metadata("design:returntype", Promise)
], FarmSellerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('seller_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], FarmSellerController.prototype, "remove", null);
exports.FarmSellerController = FarmSellerController = __decorate([
    (0, common_1.Controller)('seller/farms'),
    __metadata("design:paramtypes", [farm_service_1.FarmService])
], FarmSellerController);
//# sourceMappingURL=farm-seller.controller.js.map