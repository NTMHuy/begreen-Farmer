import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(dto: CreateProductDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, dto: UpdateProductDto): string;
    remove(id: number): string;
}
