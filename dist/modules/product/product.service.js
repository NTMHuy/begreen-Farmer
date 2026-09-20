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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
const farm_entity_1 = require("../farm/entities/farm.entity");
const category_entity_1 = require("../category/entities/category.entity");
let ProductService = class ProductService {
    productRepository;
    farmRepository;
    categoryRepository;
    constructor(productRepository, farmRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.farmRepository = farmRepository;
        this.categoryRepository = categoryRepository;
    }
    async create(dto) {
        const farm = await this.farmRepository.findOne({
            where: {
                id: dto.farm_id,
            },
        });
        if (!farm) {
            throw new common_1.NotFoundException('Không tìm thấy nông trại');
        }
        if (farm.status !== 'approved') {
            throw new common_1.BadRequestException('Nông trại chưa được Admin duyệt');
        }
        const category = await this.categoryRepository.findOne({
            where: {
                id: dto.category_id,
            },
        });
        if (!category) {
            throw new common_1.NotFoundException('Danh mục không tồn tại hoặc đã bị khóa');
        }
        const product = this.productRepository.create({
            farm_id: dto.farm_id,
            category_id: dto.category_id,
            name: dto.name,
            description: dto.description,
            price: dto.price,
        });
        return this.productRepository.save(product);
    }
    async findAll() {
        return this.productRepository.find({
            relations: {
                farm: true,
                category: true,
            },
            order: {
                created_at: 'DESC',
            },
        });
    }
    async findByFarm(farmId) {
        return this.productRepository.find({
            where: {
                farm_id: farmId,
            },
            relations: {
                category: true,
            },
            order: {
                created_at: 'DESC',
            },
        });
    }
    async findOne(id) {
        const product = await this.productRepository.findOne({
            where: {
                id,
            },
            relations: {
                farm: true,
                category: true,
            },
        });
        if (!product) {
            throw new common_1.NotFoundException('Không tìm thấy sản phẩm');
        }
        return product;
    }
    async update(id, dto) {
        const product = await this.findOne(id);
        if (dto.category_id) {
            const category = await this.categoryRepository.findOne({
                where: {
                    id: dto.category_id,
                },
            });
            if (!category) {
                throw new common_1.NotFoundException('Danh mục không tồn tại hoặc đã bị khóa');
            }
        }
        Object.assign(product, dto);
        return this.productRepository.save(product);
    }
    async remove(id) {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
        return {
            message: 'Xóa sản phẩm thành công',
        };
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(farm_entity_1.Farm)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProductService);
//# sourceMappingURL=product.service.js.map