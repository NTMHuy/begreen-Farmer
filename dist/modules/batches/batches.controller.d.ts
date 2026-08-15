import { BatchesService } from './batches.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
export declare class BatchesController {
    private readonly batchesService;
    constructor(batchesService: BatchesService);
    create(createBatchDto: CreateBatchDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateBatchDto: UpdateBatchDto): string;
    remove(id: string): string;
}
