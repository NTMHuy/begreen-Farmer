import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
type SafeUser = Omit<User, 'password'>;
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<SafeUser>;
    findAll(query: UserQueryDto): Promise<{
        items: SafeUser[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<SafeUser>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<SafeUser>;
    lock(id: number): Promise<{
        message: string;
    }>;
    unlock(id: number): Promise<{
        message: string;
    }>;
    resetPassword(id: number, resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
    private findUserEntity;
    private ensureEmailNotTaken;
    private setStatus;
    private toResponse;
}
export {};
