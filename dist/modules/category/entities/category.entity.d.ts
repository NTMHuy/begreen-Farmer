import { Product } from '../../product/entities/product.entity';
export declare class Category {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    products: Product[];
}
