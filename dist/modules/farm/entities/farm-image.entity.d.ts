import { Farm } from './farm.entity';
export declare enum FarmImageType {
    FARM = "farm",
    CERTIFICATE = "certificate"
}
export declare class FarmImage {
    id: number;
    farm_id: number;
    farm: Farm;
    image_url: string;
    image_type: FarmImageType;
    created_at: Date;
}
