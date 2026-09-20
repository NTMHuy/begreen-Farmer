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
exports.Farm = exports.TrustLevel = exports.FarmStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const farm_image_entity_1 = require("./farm-image.entity");
const product_entity_1 = require("../../product/entities/product.entity");
var FarmStatus;
(function (FarmStatus) {
    FarmStatus["PENDING"] = "pending";
    FarmStatus["APPROVED"] = "approved";
    FarmStatus["REJECTED"] = "rejected";
})(FarmStatus || (exports.FarmStatus = FarmStatus = {}));
var TrustLevel;
(function (TrustLevel) {
    TrustLevel["LOW"] = "low";
    TrustLevel["MEDIUM"] = "medium";
    TrustLevel["HIGH"] = "high";
})(TrustLevel || (exports.TrustLevel = TrustLevel = {}));
let Farm = class Farm {
    id;
    seller_id;
    seller;
    products;
    farm_name;
    owner_name;
    address;
    description;
    area_ha;
    farming_method;
    latitude;
    longitude;
    trust_level;
    status;
    images;
    created_at;
    updated_at;
};
exports.Farm = Farm;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Farm.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'seller_id' }),
    __metadata("design:type", Number)
], Farm.prototype, "seller_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.farms, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'seller_id' }),
    __metadata("design:type", user_entity_1.User)
], Farm.prototype, "seller", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, (product) => product.category),
    __metadata("design:type", Array)
], Farm.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'farm_name', length: 150 }),
    __metadata("design:type", String)
], Farm.prototype, "farm_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'owner_name', length: 100, nullable: true }),
    __metadata("design:type", String)
], Farm.prototype, "owner_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Farm.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Farm.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'area_ha',
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Farm.prototype, "area_ha", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'farming_method',
        length: 150,
        nullable: true,
    }),
    __metadata("design:type", String)
], Farm.prototype, "farming_method", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 7,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Farm.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 7,
        nullable: true,
    }),
    __metadata("design:type", Number)
], Farm.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'trust_level',
        type: 'enum',
        enum: TrustLevel,
        default: TrustLevel.LOW,
    }),
    __metadata("design:type", String)
], Farm.prototype, "trust_level", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: FarmStatus,
        default: FarmStatus.PENDING,
    }),
    __metadata("design:type", String)
], Farm.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => farm_image_entity_1.FarmImage, (image) => image.farm, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Farm.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], Farm.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], Farm.prototype, "updated_at", void 0);
exports.Farm = Farm = __decorate([
    (0, typeorm_1.Entity)('farms')
], Farm);
//# sourceMappingURL=farm.entity.js.map