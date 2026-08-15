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
exports.BatchImage = void 0;
const typeorm_1 = require("typeorm");
const batch_entity_1 = require("./batch.entity");
let BatchImage = class BatchImage {
    id;
    batchId;
    batch;
    imageUrl;
};
exports.BatchImage = BatchImage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BatchImage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'batch_id' }),
    __metadata("design:type", Number)
], BatchImage.prototype, "batchId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => batch_entity_1.Batch, (batch) => batch.images, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'batch_id' }),
    __metadata("design:type", batch_entity_1.Batch)
], BatchImage.prototype, "batch", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', length: 255 }),
    __metadata("design:type", String)
], BatchImage.prototype, "imageUrl", void 0);
exports.BatchImage = BatchImage = __decorate([
    (0, typeorm_1.Entity)('batch_images')
], BatchImage);
//# sourceMappingURL=batch-image.entity.js.map