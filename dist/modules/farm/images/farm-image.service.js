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
exports.FarmImageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const farm_image_entity_1 = require("../entities/farm-image.entity");
const farm_entity_1 = require("../entities/farm.entity");
let FarmImageService = class FarmImageService {
    imageRepo;
    farmRepo;
    constructor(imageRepo, farmRepo) {
        this.imageRepo = imageRepo;
        this.farmRepo = farmRepo;
    }
    async upload(farmId, file, type = farm_image_entity_1.FarmImageType.FARM) {
        const farm = await this.farmRepo.findOne({
            where: {
                id: farmId,
            },
        });
        if (!farm)
            throw new common_1.NotFoundException('Farm không tồn tại');
        const image = this.imageRepo.create({
            farm_id: farmId,
            image_url: file?.path || file?.filename || '',
            image_type: type,
        });
        return this.imageRepo.save(image);
    }
    async findByFarm(farmId) {
        return this.imageRepo.find({
            where: {
                farm_id: farmId,
            },
        });
    }
    async delete(imageId) {
        const image = await this.imageRepo.findOne({
            where: { id: imageId },
        });
        if (!image) {
            throw new common_1.NotFoundException('Ảnh không tồn tại');
        }
        return this.imageRepo.remove(image);
    }
};
exports.FarmImageService = FarmImageService;
exports.FarmImageService = FarmImageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(farm_image_entity_1.FarmImage)),
    __param(1, (0, typeorm_1.InjectRepository)(farm_entity_1.Farm)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FarmImageService);
//# sourceMappingURL=farm-image.service.js.map