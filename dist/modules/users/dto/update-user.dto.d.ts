import { UserRole, UserStatus } from '../entities/user.entity';
export declare class UpdateUserDto {
    full_name?: string;
    email?: string;
    phone?: string;
    address?: string;
    avatar?: string;
    role?: UserRole;
    status?: UserStatus;
}
