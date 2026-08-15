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
exports.CultivationLog = void 0;
const typeorm_1 = require("typeorm");
const batch_entity_1 = require("../../batches/entities/batch.entity");
let CultivationLog = class CultivationLog {
    id;
    batchId;
    batch;
    activity;
    description;
    image;
    logDate;
};
exports.CultivationLog = CultivationLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CultivationLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'batch_id' }),
    __metadata("design:type", Number)
], CultivationLog.prototype, "batchId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => batch_entity_1.Batch, (batch) => batch.cultivationLogs, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'batch_id' }),
    __metadata("design:type", batch_entity_1.Batch)
], CultivationLog.prototype, "batch", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], CultivationLog.prototype, "activity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], CultivationLog.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], CultivationLog.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'log_date', type: 'date' }),
    __metadata("design:type", String)
], CultivationLog.prototype, "logDate", void 0);
exports.CultivationLog = CultivationLog = __decorate([
    (0, typeorm_1.Entity)('cultivation_logs')
], CultivationLog);
//# sourceMappingURL=cultivation-log.entity.js.map