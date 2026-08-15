import { Farm } from '../../farm/entities/farm.entity';
import { Batch } from '../../batches/entities/batch.entity';
export declare class Product {
    id: number;
    farmId: number;
    farm: Farm;
    categoryId: number;
    name: string;
    description: string | null;
    price: number;
    createdAt: Date;
    batches: Batch[];
}
