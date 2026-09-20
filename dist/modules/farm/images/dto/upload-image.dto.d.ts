import { FarmImageType } from "../../entities/farm-image.entity";
export declare class CreateFarmImageDto {
    image: Express.Multer.File;
    image_type?: FarmImageType;
}
