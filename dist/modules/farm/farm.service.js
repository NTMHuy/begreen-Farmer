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
let FarmService = class FarmService {
    farmRepository;
    userRepository;
    constructor(farmRepository, userRepository) {
        this.farmRepository = farmRepository;
        this.userRepository = userRepository;
    }
    async create(dto) {
        const seller = await this.userRepository.findOne({
            where: {
                id: dto.sellerId,
            },
        });
        if (!seller) {
            throw new common_1.NotFoundException('Không tìm thấy Seller');
        }
        if (seller.role !== 'seller') {
            throw new common_1.ConflictException('User này không phải Seller');
        }
        const farm = this.farmRepository.create({
            farmName: dto.farmName,
            ownerName: dto.ownerName,
            address: dto.address,
            description: dto.description,
            seller: seller,
        });
        const savedFarm = await this.farmRepository.save(farm);
        return {
            success: true,
            message: 'Tạo nông trại thành công',
            data: savedFarm,
        };
    }
    async findAll(query) {
        const { search, status, sellerId, page = 1, limit = 10 } = query;
        const qb = this.farmRepository
            .createQueryBuilder('farm')
            .leftJoinAndSelect('farm.seller', 'seller')
            .leftJoinAndSelect('farm.images', 'images');
        if (search) {
            qb.andWhere('(farm.farmName ILIKE :search OR farm.ownerName ILIKE :search OR farm.address ILIKE :search)', { search: `%${search}%` });
        }
        if (status) {
            qb.andWhere('farm.status = :status', { status });
        }
        if (sellerId) {
            qb.andWhere('farm.sellerId = :sellerId', { sellerId });
        }
        qb.orderBy('farm.createdAt', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        const [farms, total] = await qb.getManyAndCount();
        return {
            items: farms,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    findOne(id) {
        return `This action returns a #${id} farm`;
    }
    update(id, updateFarmDto) {
        return `This action updates a #${id} farm`;
    }
    remove(id) {
        return `This action removes a #${id} farm`;
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