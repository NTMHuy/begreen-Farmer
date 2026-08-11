import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            createdAt: Date;
            farms: import("../farm/entities/farm.entity").Farm[];
            address?: string | undefined;
            status: import("./entities/user.entity").UserStatus;
            updatedAt: Date;
            fullName: string;
            email: string;
            phone?: string | undefined;
            avatar?: string | undefined;
            role: import("./entities/user.entity").UserRole;
            lastLogin?: Date | undefined;
        };
    }>;
    findAll(query: UserQueryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            items: {
                id: number;
                createdAt: Date;
                farms: import("../farm/entities/farm.entity").Farm[];
                address?: string | undefined;
                status: import("./entities/user.entity").UserStatus;
                updatedAt: Date;
                fullName: string;
                email: string;
                phone?: string | undefined;
                avatar?: string | undefined;
                role: import("./entities/user.entity").UserRole;
                lastLogin?: Date | undefined;
            }[];
            meta: {
                page: number;
                limit: number;
                total: number;
                totalPages: number;
            };
        };
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            createdAt: Date;
            farms: import("../farm/entities/farm.entity").Farm[];
            address?: string | undefined;
            status: import("./entities/user.entity").UserStatus;
            updatedAt: Date;
            fullName: string;
            email: string;
            phone?: string | undefined;
            avatar?: string | undefined;
            role: import("./entities/user.entity").UserRole;
            lastLogin?: Date | undefined;
        };
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            createdAt: Date;
            farms: import("../farm/entities/farm.entity").Farm[];
            address?: string | undefined;
            status: import("./entities/user.entity").UserStatus;
            updatedAt: Date;
            fullName: string;
            email: string;
            phone?: string | undefined;
            avatar?: string | undefined;
            role: import("./entities/user.entity").UserRole;
            lastLogin?: Date | undefined;
        };
    }>;
    lock(id: number): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    unlock(id: number): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    resetPassword(id: number, dto: ResetPasswordDto): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    remove(id: number): Promise<{
        success: boolean;
        message: string;
        data: null;
    }>;
    private ok;
}
