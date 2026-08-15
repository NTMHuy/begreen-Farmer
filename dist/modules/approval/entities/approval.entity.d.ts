import { Batch } from '../../batches/entities/batch.entity';
import { User } from '../../users/entities/user.entity';
import { ApprovalDecisionStatus } from '../../common/enums';
export declare class Approval {
    id: number;
    batchId: number;
    batch: Batch;
    adminId: number;
    admin: User;
    status: ApprovalDecisionStatus;
    note: string | null;
    approvedAt: Date;
}
