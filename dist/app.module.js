"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const database_config_1 = require("./config/database.config");
const users_module_1 = require("./modules/users/users.module");
const farm_module_1 = require("./modules/farm/farm.module");
const category_module_1 = require("./modules/category/category.module");
const product_module_1 = require("./modules/product/product.module");
const approval_module_1 = require("./modules/approval/approval.module");
const cultivation_logs_module_1 = require("./modules/cultivation-logs/cultivation-logs.module");
const batches_module_1 = require("./modules/batches/batches.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: database_config_1.getDatabaseConfig,
            }),
            farm_module_1.FarmModule,
            batches_module_1.BatchesModule,
            approval_module_1.ApprovalModule,
            cultivation_logs_module_1.CultivationLogsModule,
            users_module_1.UsersModule,
            category_module_1.CategoryModule,
            product_module_1.ProductModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map