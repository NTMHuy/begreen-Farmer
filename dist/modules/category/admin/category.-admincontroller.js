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
exports.CategoryAdminController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("../category.service");
const create_category_dto_1 = require("../dto/create-category.dto");
const update_category_dto_1 = require("../dto/update-category.dto");
let CategoryAdminController = class CategoryAdminController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async create(dto) {
        const data = await this.categoryService.create(dto);
        return {
            success: true,
            message: 'Tạo danh mục thành công',
            data,
        };
    }
    async findAll() {
        const data = await this.categoryService.findAll();
        return {
            success: true,
            message: 'Lấy danh sách danh mục thành công',
            data,
        };
    }
    async findOne(id) {
        const data = await this.categoryService.findOne(id);
        return {
            success: true,
            message: 'Lấy thông tin danh mục thành công',
            data,
        };
    }
    async update(id, dto) {
        const data = await this.categoryService.update(id, dto);
        return {
            success: true,
            message: 'Cập nhật danh mục thành công',
            data,
        };
    }
    async remove(id) {
        const data = await this.categoryService.remove(id);
        return {
            success: true,
            ...data,
        };
    }
};
exports.CategoryAdminController = CategoryAdminController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryAdminController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryAdminController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryAdminController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", Promise)
], CategoryAdminController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoryAdminController.prototype, "remove", null);
exports.CategoryAdminController = CategoryAdminController = __decorate([
    (0, common_1.Controller)('admin/categories'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryAdminController);
//# sourceMappingURL=category.-admincontroller.js.map