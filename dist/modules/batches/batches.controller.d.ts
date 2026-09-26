import { BatchesService } from './batches.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
export declare class BatchesController {
    private readonly batchesService;
    constructor(batchesService: BatchesService);
    create(createBatchDto: CreateBatchDto): Promise<import("./entities/batch.entity").Batch>;
    findAllBySeller(sellerId: number): Promise<import("./entities/batch.entity").Batch[]>;
    trace(code: string): Promise<import("./entities/batch.entity").Batch>;
    findOne(id: number): Promise<import("./entities/batch.entity").Batch>;
    update(id: string, updateBatchDto: UpdateBatchDto): string;
    remove(id: string): string;
}
