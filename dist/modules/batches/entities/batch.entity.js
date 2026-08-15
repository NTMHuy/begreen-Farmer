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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Batch = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../../products/entities/product.entity");
const cultivation_log_entity_1 = require("../../cultivation-logs/entities/cultivation-log.entity");
const batch_image_entity_1 = require("./batch-image.entity");
const approval_entity_1 = require("../../approval/entities/approval.entity");
const enums_1 = require("../../common/enums");
let Batch = class Batch {
    id;
    productId;
    product;
    batchCode;
    plantingDate;
    harvestDate;
    quantity;
    barcode;
    trustLevel;
    approvalStatus;
    createdAt;
    cultivationLogs;
    images;
    approvals;
};
exports.Batch = Batch;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Batch.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'product_id' }),
    __metadata("design:type", Number)
], Batch.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", product_entity_1.Product)
], Batch.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'batch_code', length: 50, unique: true }),
    __metadata("design:type", String)
], Batch.prototype, "batchCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'planting_date', type: 'date', nullable: true }),
    __metadata("design:type", String)
], Batch.prototype, "plantingDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'harvest_date', type: 'date' }),
    __metadata("design:type", String)
], Batch.prototype, "harvestDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Batch.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Batch.prototype, "barcode", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'trust_level',
        type: 'enum',
        enum: enums_1.TrustLevel,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Batch.prototype, "trustLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'approval_status',
        type: 'enum',
        enum: enums_1.BatchApprovalStatus,
        default: enums_1.BatchApprovalStatus.PENDING,
    }),
    __metadata("design:type", String)
], Batch.prototype, "approvalStatus", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Batch.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cultivation_log_entity_1.CultivationLog, (log) => log.batch),
    __metadata("design:type", Array)
], Batch.prototype, "cultivationLogs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => batch_image_entity_1.BatchImage, (image) => image.batch),
    __metadata("design:type", Array)
], Batch.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => approval_entity_1.Approval, (approval) => approval.batch),
    __metadata("design:type", Array)
], Batch.prototype, "approvals", void 0);
exports.Batch = Batch = __decorate([
    (0, typeorm_1.Entity)('batches')
], Batch);
//# sourceMappingURL=batch.entity.js.map