"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const farm_service_1 = require("./farm.service");
const typeorm_1 = require("@nestjs/typeorm");
const farm_entity_1 = require("./entities/farm.entity");
const user_entity_1 = require("../users/entities/user.entity");
const farm_image_entity_1 = require("./entities/farm-image.entity");
const farm_admin_controller_1 = require("./admin/farm-admin.controller");
const farm_seller_controller_1 = require("./seller/farm-seller.controller");
const farm_images_controller_1 = require("./images/farm-images.controller");
const farm_image_service_1 = require("./images/farm-image.service");
let FarmModule = class FarmModule {
};
exports.FarmModule = FarmModule;
exports.FarmModule = FarmModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([farm_entity_1.Farm, user_entity_1.User, farm_image_entity_1.FarmImage]),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/farms',
                    filename: (req, file, callback) => {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                        const ext = (0, path_1.extname)(file.originalname);
                        callback(null, `farm-${uniqueSuffix}${ext}`);
                    },
                }),
            }),
        ],
        controllers: [farm_admin_controller_1.FarmAdminController, farm_images_controller_1.FarmImageController, farm_seller_controller_1.FarmSellerController],
        providers: [farm_service_1.FarmService, farm_image_service_1.FarmImageService],
    })
], FarmModule);
//# sourceMappingURL=farm.module.js.map