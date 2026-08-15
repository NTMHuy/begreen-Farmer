import { Product } from '../../products/entities/product.entity';
import { CultivationLog } from '../../cultivation-logs/entities/cultivation-log.entity';
import { BatchImage } from './batch-image.entity';
import { Approval } from '../../approval/entities/approval.entity';
import { BatchApprovalStatus, TrustLevel } from '../../common/enums';
export declare class Batch {
    id: number;
    productId: number;
    product: Product;
    batchCode: string;
    plantingDate: string;
    harvestDate: string;
    quantity: number;
    barcode: string;
    trustLevel: TrustLevel | null;
    approvalStatus: BatchApprovalStatus;
    createdAt: Date;
    cultivationLogs: CultivationLog[];
    images: BatchImage[];
    approvals: Approval[];
}
