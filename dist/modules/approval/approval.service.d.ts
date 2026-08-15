import { Repository } from 'typeorm';
import { Batch } from '../batches/entities/batch.entity';
import { Approval } from './entities/approval.entity';
import { ApproveBatchDto } from './dto/approve-batch.dto';
import { RejectBatchDto } from './dto/reject-batch.dto';
export declare class ApprovalService {
    private readonly batchRepository;
    private readonly approvalRepository;
    constructor(batchRepository: Repository<Batch>, approvalRepository: Repository<Approval>);
    findPending(): Promise<Batch[]>;
    findOne(batchId: number): Promise<Batch>;
    approve(batchId: number, dto: ApproveBatchDto): Promise<Batch>;
    reject(batchId: number, dto: RejectBatchDto): Promise<Batch>;
}
