import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Repository } from 'typeorm';
import { Farm } from './entities/farm.entity';
import { User } from '../users/entities/user.entity';
import { QueryFarmDto } from './dto/query-farm.dto';
export declare class FarmService {
    private readonly farmRepository;
    private readonly userRepository;
    constructor(farmRepository: Repository<Farm>, userRepository: Repository<User>);
    create(dto: CreateFarmDto): Promise<{
        success: boolean;
        message: string;
        data: Farm;
    }>;
    findAll(query: QueryFarmDto): Promise<{
        items: Farm[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): string;
    update(id: number, updateFarmDto: UpdateFarmDto): string;
    remove(id: number): string;
}
