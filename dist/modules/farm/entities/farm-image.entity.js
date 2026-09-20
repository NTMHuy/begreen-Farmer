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
exports.FarmImage = exports.FarmImageType = void 0;
const typeorm_1 = require("typeorm");
const farm_entity_1 = require("./farm.entity");
var FarmImageType;
(function (FarmImageType) {
    FarmImageType["FARM"] = "farm";
    FarmImageType["CERTIFICATE"] = "certificate";
})(FarmImageType || (exports.FarmImageType = FarmImageType = {}));
let FarmImage = class FarmImage {
    id;
    farm_id;
    farm;
    image_url;
    image_type;
    created_at;
};
exports.FarmImage = FarmImage;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FarmImage.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'farm_id' }),
    __metadata("design:type", Number)
], FarmImage.prototype, "farm_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => farm_entity_1.Farm, (farm) => farm.images, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'farm_id' }),
    __metadata("design:type", farm_entity_1.Farm)
], FarmImage.prototype, "farm", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'image_url',
        length: 500,
    }),
    __metadata("design:type", String)
], FarmImage.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'image_type',
        type: 'enum',
        enum: FarmImageType,
        default: FarmImageType.FARM,
    }),
    __metadata("design:type", String)
], FarmImage.prototype, "image_type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], FarmImage.prototype, "created_at", void 0);
exports.FarmImage = FarmImage = __decorate([
    (0, typeorm_1.Entity)('farm_images')
], FarmImage);
//# sourceMappingURL=farm-image.entity.js.map