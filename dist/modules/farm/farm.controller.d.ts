import { FarmService } from './farm.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { QueryFarmDto } from './dto/query-farm.dto';
export declare class FarmController {
    private readonly farmService;
    constructor(farmService: FarmService);
    create(createFarmDto: CreateFarmDto): Promise<{
        success: boolean;
        message: string;
        data: {
            success: boolean;
            message: string;
            data: import("./entities/farm.entity").Farm;
        };
    }>;
    findAll(query: QueryFarmDto): Promise<{
        success: boolean;
        message: string;
        data: {
            items: import("./entities/farm.entity").Farm[];
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPages: number;
            };
        };
    }>;
    findOne(id: string): string;
    update(id: string, updateFarmDto: UpdateFarmDto): string;
    remove(id: string): string;
    private ok;
}
