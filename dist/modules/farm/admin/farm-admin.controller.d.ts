import { FarmService } from '../farm.service';
import { QueryFarmDto } from '../dto/query-farm.dto';
export declare class FarmAdminController {
    private readonly farmService;
    constructor(farmService: FarmService);
    findAll(query: QueryFarmDto): Promise<{
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
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/farm.entity").Farm;
    }>;
    approve(id: number): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/farm.entity").Farm;
    }>;
    reject(id: number, note?: string): Promise<{
        success: boolean;
        message: string;
        data: import("../entities/farm.entity").Farm;
    }>;
}
