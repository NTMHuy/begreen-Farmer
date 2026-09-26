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
exports.BatchesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const batch_entity_1 = require("./entities/batch.entity");
const product_entity_1 = require("../product/entities/product.entity");
const enums_1 = require("../common/enums");
let BatchesService = class BatchesService {
    batchRepository;
    productRepository;
    constructor(batchRepository, productRepository) {
        this.batchRepository = batchRepository;
        this.productRepository = productRepository;
    }
    async create(dto) {
        const product = await this.productRepository.findOne({
            where: { id: dto.productId },
            relations: { farm: true },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Không tìm thấy sản phẩm #${dto.productId}`);
        }
        if (product.farm.seller_id !== dto.sellerId) {
            throw new common_1.ForbiddenException('Sản phẩm này không thuộc nông trại của bạn');
        }
        if (dto.plantingDate && dto.harvestDate < dto.plantingDate) {
            throw new common_1.BadRequestException('Ngày thu hoạch phải sau hoặc bằng ngày gieo');
        }
        const saved = await this.batchRepository.save(this.batchRepository.create({
            productId: dto.productId,
            plantingDate: dto.plantingDate,
            harvestDate: dto.harvestDate,
            quantity: dto.quantity,
            cultivationLogs: (dto.cultivationLogs ?? []).map((log) => ({
                activity: log.activity,
                description: log.description ?? null,
                logDate: log.logDate,
            })),
        }));
        return this.findOne(saved.id);
    }
    findAllBySeller(sellerId) {
        return this.batchRepository.find({
            where: { product: { farm: { seller_id: sellerId } } },
            relations: { product: { farm: true }, images: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const batch = await this.batchRepository.findOne({
            where: { id },
            relations: { product: { farm: true }, cultivationLogs: true, images: true },
        });
        if (!batch) {
            throw new common_1.NotFoundException(`Không tìm thấy lô hàng #${id}`);
        }
        return batch;
    }
    async findByBarcodeForTrace(code) {
        const batch = await this.batchRepository.findOne({
            where: { barcode: code, approvalStatus: enums_1.BatchApprovalStatus.APPROVED },
            relations: { product: { farm: true }, cultivationLogs: true, images: true },
        });
        if (!batch) {
            throw new common_1.NotFoundException('Không tìm thấy lô hàng hoặc lô chưa được xác minh');
        }
        return batch;
    }
    update(id, updateBatchDto) {
        return `This action updates a #${id} batch`;
    }
    remove(id) {
        return `This action removes a #${id} batch`;
    }
};
exports.BatchesService = BatchesService;
exports.BatchesService = BatchesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(batch_entity_1.Batch)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BatchesService);
//# sourceMappingURL=batches.service.js.map