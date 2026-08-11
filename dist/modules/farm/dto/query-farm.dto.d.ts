import { FarmStatus } from '../entities/farm.entity';
export declare class QueryFarmDto {
    search?: string;
    page?: number;
    limit?: number;
    status?: FarmStatus;
    sellerId?: number;
}
