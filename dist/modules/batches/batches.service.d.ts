import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
export declare class BatchesService {
    create(createBatchDto: CreateBatchDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBatchDto: UpdateBatchDto): string;
    remove(id: number): string;
}
