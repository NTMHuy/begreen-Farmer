import { FarmStatus } from '../entities/farm.entity';
export declare class QueryFarmDto {
    page?: number;
    limit?: number;
    search?: string;
    status?: FarmStatus;
    seller_id?: number;
}
