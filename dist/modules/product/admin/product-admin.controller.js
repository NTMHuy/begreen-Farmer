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
exports.ProductAdminController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("../product.service");
const update_product_dto_1 = require("../dto/update-product.dto");
let ProductAdminController = class ProductAdminController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    async findAll() {
        const data = await this.productService.findAll();
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
exports.ProductAdminController = ProductAdminController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductAdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", Promise)
], ProductAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductAdminController.prototype, "remove", null);
exports.ProductAdminController = ProductAdminController = __decorate([
    (0, common_1.Controller)('admin/products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductAdminController);
//# sourceMappingURL=product-admin.controller.js.map