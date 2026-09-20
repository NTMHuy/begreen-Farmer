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
            farms: import("../farm/entities/farm.entity").Farm[];
            address?: string | undefined;
            status: import("./entities/user.entity").UserStatus;
            fullName: string;
            email: string;
            phone?: string | undefined;
            avatar?: string | undefined;
            role: import("./entities/user.entity").UserRole;
            lastLogin?: Date | undefined;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findAll(query: UserQueryDto): Promise<{
        success: boolean;
        message: string;
        data: {
            items: {
                id: number;
                farms: import("../farm/entities/farm.entity").Farm[];
                address?: string | undefined;
                status: import("./entities/user.entity").UserStatus;
                fullName: string;
                email: string;
                phone?: string | undefined;
                avatar?: string | undefined;
                role: import("./entities/user.entity").UserRole;
                lastLogin?: Date | undefined;
                createdAt: Date;
                updatedAt: Date;
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
            farms: import("../farm/entities/farm.entity").Farm[];
            address?: string | undefined;
            status: import("./entities/user.entity").UserStatus;
            fullName: string;
            email: string;
            phone?: string | undefined;
            avatar?: string | undefined;
            role: import("./entities/user.entity").UserRole;
            lastLogin?: Date | undefined;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            farms: import("../farm/entities/farm.entity").Farm[];
            address?: string | undefined;
            status: import("./entities/user.entity").UserStatus;
            fullName: string;
            email: string;
            phone?: string | undefined;
            avatar?: string | undefined;
            role: import("./entities/user.entity").UserRole;
            lastLogin?: Date | undefined;
            createdAt: Date;
            updatedAt: Date;
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
