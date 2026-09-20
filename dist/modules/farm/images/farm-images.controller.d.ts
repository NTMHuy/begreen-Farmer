import { FarmImageService } from './farm-image.service';
import { CreateFarmImageDto } from './dto/upload-image.dto';
export declare class FarmImageController {
    private readonly service;
    constructor(service: FarmImageService);
    upload(id: number, file: Express.Multer.File, dto: CreateFarmImageDto): Promise<import("../entities/farm-image.entity").FarmImage>;
    findImages(id: number): Promise<import("../entities/farm-image.entity").FarmImage[]>;
    deleteImage(imageId: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
