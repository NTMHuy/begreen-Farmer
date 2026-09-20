import { Farm } from '../../farm/entities/farm.entity';
import { Category } from '../../category/entities/category.entity';
export declare class Product {
    id: number;
    farm_id: number;
    farm: Farm;
    category_id: number;
    category: Category;
    name: string;
    description: string;
    price: number;
    created_at: Date;
}
