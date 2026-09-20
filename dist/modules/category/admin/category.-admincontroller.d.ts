import { CategoryService } from '../category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
export declare class CategoryAdminController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(dto: CreateCategoryDto): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/category.entity").Category;
    }>;
    findAll(): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/category.entity").Category[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/category.entity").Category;
    }>;
    update(id: number, dto: UpdateCategoryDto): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/category.entity").Category;
    }>;
    remove(id: number): Promise<{
        message: string;
        success: boolean;
    }>;
}
