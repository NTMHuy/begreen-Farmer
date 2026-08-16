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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalController = void 0;
const common_1 = require("@nestjs/common");
const approval_service_1 = require("./approval.service");
const approve_batch_dto_1 = require("./dto/approve-batch.dto");
const reject_batch_dto_1 = require("./dto/reject-batch.dto");
let ApprovalController = class ApprovalController {
    approvalService;
    constructor(approvalService) {
        this.approvalService = approvalService;
    }
    findPending() {
        return this.approvalService.findPending();
    }
    findAll() {
        return this.approvalService.findAll();
    }
    findOne(batchId) {
        return this.approvalService.findOne(batchId);
    }
    approve(batchId, dto) {
        return this.approvalService.approve(batchId, dto);
    }
    reject(batchId, dto) {
        return this.approvalService.reject(batchId, dto);
    }
};
exports.ApprovalController = ApprovalController;
__decorate([
    (0, common_1.Get)('pending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApprovalController.prototype, "findPending", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ApprovalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':batchId'),
    __param(0, (0, common_1.Param)('batchId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ApprovalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':batchId/approve'),
    __param(0, (0, common_1.Param)('batchId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, approve_batch_dto_1.ApproveBatchDto]),
    __metadata("design:returntype", void 0)
], ApprovalController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':batchId/reject'),
    __param(0, (0, common_1.Param)('batchId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, reject_batch_dto_1.RejectBatchDto]),
    __metadata("design:returntype", void 0)
], ApprovalController.prototype, "reject", null);
exports.ApprovalController = ApprovalController = __decorate([
    (0, common_1.Controller)('approval'),
    __metadata("design:paramtypes", [approval_service_1.ApprovalService])
], ApprovalController);
//# sourceMappingURL=approval.controller.js.map