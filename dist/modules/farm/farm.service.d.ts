import { Repository } from 'typeorm';
import { Farm } from './entities/farm.entity';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { QueryFarmDto } from './dto/query-farm.dto';
import { User } from '../users/entities/user.entity';
export declare class FarmService {
    private readonly farmRepository;
    private readonly userRepository;
    constructor(farmRepository: Repository<Farm>, userRepository: Repository<User>);
    create(dto: CreateFarmDto): Promise<Farm>;
    findAll(query: QueryFarmDto): Promise<{
        items: Farm[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findAllBySeller(sellerId: number, query: QueryFarmDto): Promise<{
        items: Farm[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<Farm>;
    findOneBySeller(id: number, sellerId: number): Promise<Farm>;
    updateBySeller(id: number, sellerId: number, dto: UpdateFarmDto): Promise<Farm>;
    removeBySeller(id: number, sellerId: number): Promise<void>;
    approve(id: number): Promise<Farm>;
    reject(id: number, note?: string): Promise<Farm>;
    private findFarmEntity;
    private ensureFarmOwnership;
    private findSellerEntity;
    private setStatus;
}
