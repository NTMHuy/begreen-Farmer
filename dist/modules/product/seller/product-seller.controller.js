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
exports.ProductSellerController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("../product.service");
const create_product_dto_1 = require("../dto/create-product.dto");
const update_product_dto_1 = require("../dto/update-product.dto");
let ProductSellerController = class ProductSellerController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    async create(dto) {
        const data = await this.productService.create(dto);
        return {
            success: true,
            message: 'Tạo sản phẩm thành công',
            data,
        };
    }
    async findByFarm(farmId) {
        const data = await this.productService.findByFarm(farmId);
        return {
            success: true,
            message: 'Lấy danh sách sản phẩm thành công',
            data,
        };
    }
    async findOne(id) {
        const data = await this.productService.findOne(id);
        return {
            success: true,
            message: 'Lấy thông tin sản phẩm thành công',
            data,
        };
    }
    async update(id, dto) {
        const data = await this.productService.update(id, dto);
        return {
            success: true,
            message: 'Cập nhật sản phẩm thành công',
            data,
        };
    }
    async remove(id) {
        const data = await this.productService.remove(id);
        return {
            success: true,
            ...data,
        };
    }
};
exports.ProductSellerController = ProductSellerController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], ProductSellerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('farm_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductSellerController.prototype, "findByFarm", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductSellerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductSellerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductSellerController.prototype, "remove", null);
exports.ProductSellerController = ProductSellerController = __decorate([
    (0, common_1.Controller)('seller/products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductSellerController);
//# sourceMappingURL=product-seller.controller.js.map