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
exports.Farm = exports.FarmStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const farm_image_entity_1 = require("./farm-image.entity");
var FarmStatus;
(function (FarmStatus) {
    FarmStatus["ACTIVE"] = "active";
    FarmStatus["INACTIVE"] = "inactive";
    FarmStatus["SUSPENDED"] = "suspended";
})(FarmStatus || (exports.FarmStatus = FarmStatus = {}));
let Farm = class Farm {
    id;
    sellerId;
    seller;
    farmName;
    ownerName;
    address;
    description;
    status;
    images;
    createdAt;
    updatedAt;
};
exports.Farm = Farm;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Farm.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'seller_id' }),
    __metadata("design:type", Number)
], Farm.prototype, "sellerId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.farms, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'seller_id' }),
    __metadata("design:type", user_entity_1.User)
], Farm.prototype, "seller", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'farm_name',
        length: 150,
    }),
    __metadata("design:type", String)
], Farm.prototype, "farmName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'owner_name',
        length: 100,
        nullable: true,
    }),
    __metadata("design:type", String)
], Farm.prototype, "ownerName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Farm.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Farm.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: FarmStatus,
        default: FarmStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Farm.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => farm_image_entity_1.FarmImage, (farmImage) => farmImage.farm, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Farm.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], Farm.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], Farm.prototype, "updatedAt", void 0);
exports.Farm = Farm = __decorate([
    (0, typeorm_1.Entity)('farms')
], Farm);
//# sourceMappingURL=farm.entity.js.map