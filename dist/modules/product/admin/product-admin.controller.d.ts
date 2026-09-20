import { ProductService } from '../product.service';
import { UpdateProductDto } from '../dto/update-product.dto';
export declare class ProductAdminController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/product.entity").Product[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/product.entity").Product;
    }>;
    update(id: number, dto: UpdateProductDto): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/product.entity").Product;
    }>;
    remove(id: number): Promise<{
        message: string;
        success: boolean;
    }>;
}
