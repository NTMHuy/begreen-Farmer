import { Repository } from 'typeorm';
import { FarmImage, FarmImageType } from '../entities/farm-image.entity';
import { Farm } from '../entities/farm.entity';
export declare class FarmImageService {
    private imageRepo;
    private farmRepo;
    constructor(imageRepo: Repository<FarmImage>, farmRepo: Repository<Farm>);
    upload(farmId: number, file: any, type?: FarmImageType): Promise<FarmImage>;
    findByFarm(farmId: number): Promise<FarmImage[]>;
    delete(imageId: number): Promise<FarmImage>;
}
