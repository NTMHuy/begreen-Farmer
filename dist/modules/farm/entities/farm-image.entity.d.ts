import { Farm } from './farm.entity';
export declare class FarmImage {
    id: number;
    farmId: number;
    farm: Farm;
    imageUrl: string;
    imageType: string;
    createdAt: Date;
}
