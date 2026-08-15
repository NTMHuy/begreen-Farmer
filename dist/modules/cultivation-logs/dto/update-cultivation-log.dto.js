"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCultivationLogDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_cultivation_log_dto_1 = require("./create-cultivation-log.dto");
class UpdateCultivationLogDto extends (0, mapped_types_1.PartialType)(create_cultivation_log_dto_1.CreateCultivationLogDto) {
}
exports.UpdateCultivationLogDto = UpdateCultivationLogDto;
//# sourceMappingURL=update-cultivation-log.dto.js.map