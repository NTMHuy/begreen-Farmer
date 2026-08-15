import { Batch } from '../../batches/entities/batch.entity';
export declare class CultivationLog {
    id: number;
    batchId: number;
    batch: Batch;
    activity: string;
    description: string | null;
    image: string | null;
    logDate: string;
}
