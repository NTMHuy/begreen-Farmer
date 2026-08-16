import { ApprovalService } from './approval.service';
import { ApproveBatchDto } from './dto/approve-batch.dto';
import { RejectBatchDto } from './dto/reject-batch.dto';
export declare class ApprovalController {
    private readonly approvalService;
    constructor(approvalService: ApprovalService);
    findPending(): Promise<import("../batches/entities/batch.entity").Batch[]>;
    findAll(): Promise<import("../batches/entities/batch.entity").Batch[]>;
    findOne(batchId: number): Promise<import("../batches/entities/batch.entity").Batch>;
    approve(batchId: number, dto: ApproveBatchDto): Promise<import("../batches/entities/batch.entity").Batch>;
    reject(batchId: number, dto: RejectBatchDto): Promise<import("../batches/entities/batch.entity").Batch>;
}
