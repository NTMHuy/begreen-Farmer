"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CultivationLogsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const cultivation_logs_service_1 = require("./cultivation-logs.service");
const cultivation_logs_controller_1 = require("./cultivation-logs.controller");
const cultivation_log_entity_1 = require("./entities/cultivation-log.entity");
let CultivationLogsModule = class CultivationLogsModule {
};
exports.CultivationLogsModule = CultivationLogsModule;
exports.CultivationLogsModule = CultivationLogsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([cultivation_log_entity_1.CultivationLog])],
        controllers: [cultivation_logs_controller_1.CultivationLogsController],
        providers: [cultivation_logs_service_1.CultivationLogsService],
        exports: [cultivation_logs_service_1.CultivationLogsService],
    })
], CultivationLogsModule);
//# sourceMappingURL=cultivation-logs.module.js.map