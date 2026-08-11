import { User } from '../../users/entities/user.entity';
import { FarmImage } from './farm-image.entity';
export declare enum FarmStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    SUSPENDED = "suspended"
}
export declare class Farm {
    id: number;
    sellerId: number;
    seller: User;
    farmName: string;
    ownerName: string;
    address: string;
    description: string;
    status: FarmStatus;
    images: FarmImage[];
    createdAt: Date;
    updatedAt: Date;
}
