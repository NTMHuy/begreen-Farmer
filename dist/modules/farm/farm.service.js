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
exports.FarmService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const farm_entity_1 = require("./entities/farm.entity");
const user_entity_1 = require("../users/entities/user.entity");
const farm_entity_2 = require("./entities/farm.entity");
let FarmService = class FarmService {
    farmRepository;
    userRepository;
    constructor(farmRepository, userRepository) {
        this.farmRepository = farmRepository;
        this.userRepository = userRepository;
    }
    async create(dto) {
        const seller = await this.findSellerEntity(dto.seller_id);
        const farm = this.farmRepository.create({
            ...dto,
            seller,
            status: farm_entity_2.FarmStatus.PENDING,
        });
        return this.farmRepository.save(farm);
    }
    async findAll(query) {
        const { search, status, seller_id, page = 1, limit = 10 } = query;
        const qb = this.farmRepository
            .createQueryBuilder('farm')
            .leftJoinAndSelect('farm.seller', 'seller')
            .leftJoinAndSelect('farm.images', 'images');
        if (search) {
            qb.andWhere('(farm.farm_name ILIKE :search OR farm.address ILIKE :search)', { search: `%${search}%` });
        }
        if (status) {
            qb.andWhere('farm.status = :status', { status });
        }
        if (seller_id) {
            qb.andWhere('farm.seller_id = :seller_id', { seller_id });
        }
        qb.orderBy('farm.created_at', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        const [items, total] = await qb.getManyAndCount();
        return {
            items,
            meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
        };
    }
    async findAllBySeller(sellerId, query) {
        return this.findAll({ ...query, seller_id: sellerId });
    }
    async findOne(id) {
        return this.findFarmEntity(id, {
            relations: { seller: true, images: true },
        });
    }
    async findOneBySeller(id, sellerId) {
        const farm = await this.findFarmEntity(id, {
            relations: { images: true },
        });
        this.ensureFarmOwnership(farm, sellerId);
        return farm;
    }
    async updateBySeller(id, sellerId, dto) {
        const farm = await this.findOneBySeller(id, sellerId);
        Object.assign(farm, dto);
        return this.farmRepository.save(farm);
    }
    async removeBySeller(id, sellerId) {
        const farm = await this.findOneBySeller(id, sellerId);
        await this.farmRepository.remove(farm);
    }
    async approve(id) {
        return this.setStatus(id, farm_entity_2.FarmStatus.APPROVED);
    }
    async reject(id, note) {
        return this.setStatus(id, farm_entity_2.FarmStatus.REJECTED);
    }
    async findFarmEntity(id, options) {
        const farm = await this.farmRepository.findOne({
            where: { id },
            relations: options?.relations,
        });
        if (!farm) {
            throw new common_1.NotFoundException('Không tìm thấy Farm');
        }
        return farm;
    }
    ensureFarmOwnership(farm, sellerId) {
        if (farm.seller_id !== sellerId) {
            throw new common_1.ForbiddenException('Bạn không có quyền truy cập Farm này');
        }
    }
    async findSellerEntity(sellerId) {
        const seller = await this.userRepository.findOne({
            where: { id: sellerId },
        });
        if (!seller) {
            throw new common_1.NotFoundException('Không tìm thấy Seller');
        }
        if (seller.role !== user_entity_1.UserRole.SELLER) {
            throw new common_1.ConflictException('User này không phải Seller');
        }
        return seller;
    }
    async setStatus(id, status) {
        const farm = await this.findFarmEntity(id);
        farm.status = status;
        return this.farmRepository.save(farm);
    }
};
exports.FarmService = FarmService;
exports.FarmService = FarmService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(farm_entity_1.Farm)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FarmService);
//# sourceMappingURL=farm.service.js.map