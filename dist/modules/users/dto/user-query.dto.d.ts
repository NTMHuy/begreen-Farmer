import { UserRole, UserStatus } from '../entities/user.entity';
export declare class UserQueryDto {
    search?: string;
    role?: UserRole;
    status?: UserStatus;
    page: number;
    limit: number;
}
