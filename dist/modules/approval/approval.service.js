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
exports.ApprovalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const batch_entity_1 = require("../batches/entities/batch.entity");
const approval_entity_1 = require("./entities/approval.entity");
const enums_1 = require("../common/enums");
let ApprovalService = class ApprovalService {
    batchRepository;
    approvalRepository;
    constructor(batchRepository, approvalRepository) {
        this.batchRepository = batchRepository;
        this.approvalRepository = approvalRepository;
    }
    async findAll() {
        return this.batchRepository.find({
            relations: { product: { farm: true }, cultivationLogs: true, images: true, approvals: true },
            order: { createdAt: 'DESC' },
        });
    }
    async findPending() {
        return this.batchRepository.find({
            where: { approvalStatus: enums_1.BatchApprovalStatus.PENDING },
            relations: { product: { farm: true }, cultivationLogs: true, images: true, approvals: true },
            order: { createdAt: 'ASC' },
        });
    }
    async findOne(batchId) {
        const batch = await this.batchRepository.findOne({
            where: { id: batchId },
            relations: { product: { farm: true }, cultivationLogs: true, images: true, approvals: true },
        });
        if (!batch) {
            throw new common_1.NotFoundException(`Không tìm thấy lô hàng #${batchId}`);
        }
        return batch;
    }
    async approve(batchId, dto) {
        const batch = await this.findOne(batchId);
        if (batch.approvalStatus !== enums_1.BatchApprovalStatus.PENDING) {
            throw new common_1.BadRequestException(`Lô hàng #${batchId} đã được xử lý trước đó (trạng thái hiện tại: ${batch.approvalStatus})`);
        }
        batch.approvalStatus = enums_1.BatchApprovalStatus.APPROVED;
        batch.trustLevel = dto.trustLevel;
        if (!batch.barcode) {
            batch.barcode = this.generateBarcode(batch.batchCode);
        }
        await this.batchRepository.save(batch);
        await this.approvalRepository.save(this.approvalRepository.create({
            batchId,
            adminId: dto.adminId,
            status: enums_1.ApprovalDecisionStatus.APPROVED,
            note: dto.note ?? null,
        }));
        return this.findOne(batchId);
    }
    generateBarcode(batchCode) {
        const random = Math.random().toString(36).substring(2, 10).toUpperCase();
        return `GF-QR-${batchCode}-${random}`;
    }
    async reject(batchId, dto) {
        const batch = await this.findOne(batchId);
        if (batch.approvalStatus !== enums_1.BatchApprovalStatus.PENDING) {
            throw new common_1.BadRequestException(`Lô hàng #${batchId} đã được xử lý trước đó (trạng thái hiện tại: ${batch.approvalStatus})`);
        }
        batch.approvalStatus = enums_1.BatchApprovalStatus.REJECTED;
        await this.batchRepository.save(batch);
        await this.approvalRepository.save(this.approvalRepository.create({
            batchId,
            adminId: dto.adminId,
            status: enums_1.ApprovalDecisionStatus.REJECTED,
            note: dto.reason,
        }));
        return this.findOne(batchId);
    }
};
exports.ApprovalService = ApprovalService;
exports.ApprovalService = ApprovalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(batch_entity_1.Batch)),
    __param(1, (0, typeorm_1.InjectRepository)(approval_entity_1.Approval)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ApprovalService);
//# sourceMappingURL=approval.service.js.map