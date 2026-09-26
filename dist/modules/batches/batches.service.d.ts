import { Repository } from 'typeorm';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { Batch } from './entities/batch.entity';
import { Product } from '../product/entities/product.entity';
export declare class BatchesService {
    private readonly batchRepository;
    private readonly productRepository;
    constructor(batchRepository: Repository<Batch>, productRepository: Repository<Product>);
    create(dto: CreateBatchDto): Promise<Batch>;
    findAllBySeller(sellerId: number): Promise<Batch[]>;
    findOne(id: number): Promise<Batch>;
    findByBarcodeForTrace(code: string): Promise<Batch>;
    update(id: number, updateBatchDto: UpdateBatchDto): string;
    remove(id: number): string;
}
