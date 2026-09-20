import { ProductService } from '../product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
export declare class ProductSellerController {
    private readonly productService;
    constructor(productService: ProductService);
    create(dto: CreateProductDto): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/product.entity").Product;
    }>;
    findByFarm(farmId: number): Promise<{
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
