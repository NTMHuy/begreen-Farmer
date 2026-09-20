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
exports.FarmImageController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const farm_image_service_1 = require("./farm-image.service");
const upload_image_dto_1 = require("./dto/upload-image.dto");
let FarmImageController = class FarmImageController {
    service;
    constructor(service) {
        this.service = service;
    }
    async upload(id, file, dto) {
        if (!file) {
            throw new common_1.BadRequestException('Vui lòng chọn file ảnh để tải lên (Key: image)');
        }
        return this.service.upload(id, file, dto.image_type);
    }
    findImages(id) {
        return this.service.findByFarm(id);
    }
    async deleteImage(imageId) {
        await this.service.delete(imageId);
        return {
            success: true,
            message: 'Xóa ảnh thành công',
        };
    }
};
exports.FarmImageController = FarmImageController;
__decorate([
    (0, common_1.Post)(':id/images'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, upload_image_dto_1.CreateFarmImageDto]),
    __metadata("design:returntype", Promise)
], FarmImageController.prototype, "upload", null);
__decorate([
    (0, common_1.Get)(':id/images'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FarmImageController.prototype, "findImages", null);
__decorate([
    (0, common_1.Delete)('images/:imageId'),
    __param(0, (0, common_1.Param)('imageId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FarmImageController.prototype, "deleteImage", null);
exports.FarmImageController = FarmImageController = __decorate([
    (0, common_1.Controller)('seller/farms'),
    __metadata("design:paramtypes", [farm_image_service_1.FarmImageService])
], FarmImageController);
//# sourceMappingURL=farm-images.controller.js.map