import { UserRole } from '../entities/user.entity';
export declare class CreateUserDto {
    full_name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    avatar?: string;
    role: UserRole;
}
