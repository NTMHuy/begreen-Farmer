import { FarmService } from '../farm.service';
import { CreateFarmDto } from '../dto/create-farm.dto';
import { UpdateFarmDto } from '../dto/update-farm.dto';
import { QueryFarmDto } from '../dto/query-farm.dto';
export declare class FarmSellerController {
    private readonly farmService;
    constructor(farmService: FarmService);
    create(dto: CreateFarmDto): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/farm.entity").Farm;
    }>;
    findAll(sellerId: number, query: QueryFarmDto): Promise<{
        success: boolean;
        message: string;
        data: {
            items: import("../entities/farm.entity").Farm[];
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPages: number;
            };
        };
    }>;
    findOne(id: number, sellerId: number): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/farm.entity").Farm;
    }>;
    update(id: number, sellerId: number, dto: UpdateFarmDto): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/farm.entity").Farm;
    }>;
    remove(id: number, sellerId: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
