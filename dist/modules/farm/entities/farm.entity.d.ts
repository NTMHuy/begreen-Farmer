import { User } from '../../users/entities/user.entity';
import { FarmImage } from './farm-image.entity';
import { Product } from '../../product/entities/product.entity';
export declare enum FarmStatus {
    PENDING = "pending",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare enum TrustLevel {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high"
}
export declare class Farm {
    id: number;
    seller_id: number;
    seller: User;
    products: Product[];
    farm_name: string;
    owner_name: string;
    address: string;
    description: string;
    area_ha: number;
    farming_method: string;
    latitude: number;
    longitude: number;
    trust_level: TrustLevel;
    status: FarmStatus;
    images: FarmImage[];
    created_at: Date;
    updated_at: Date;
}
