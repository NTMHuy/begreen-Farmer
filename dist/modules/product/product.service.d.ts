import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Farm } from '../farm/entities/farm.entity';
import { Category } from '../category/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductService {
    private readonly productRepository;
    private readonly farmRepository;
    private readonly categoryRepository;
    constructor(productRepository: Repository<Product>, farmRepository: Repository<Farm>, categoryRepository: Repository<Category>);
    create(dto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findByFarm(farmId: number): Promise<Product[]>;
    findOne(id: number): Promise<Product>;
    update(id: number, dto: UpdateProductDto): Promise<Product>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
