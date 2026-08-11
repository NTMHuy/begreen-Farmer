import { Farm } from '../../farm/entities/farm.entity';
export declare enum UserRole {
    ADMIN = "admin",
    SELLER = "seller",
    BUYER = "buyer"
}
export declare enum UserStatus {
    ACTIVE = "active",
    LOCKED = "locked"
}
export declare class User {
    id: number;
    farms: Farm[];
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    avatar?: string;
    role: UserRole;
    status: UserStatus;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
}
