"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcrypt"));
const user_entity_1 = require("./entities/user.entity");
const SALT_ROUNDS = 10;
let UsersService = class UsersService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        await this.ensureEmailNotTaken(createUserDto.email);
        const hashedPassword = await bcrypt.hash(createUserDto.password, SALT_ROUNDS);
        const user = this.userRepository.create({
            fullName: createUserDto.full_name,
            email: createUserDto.email,
            password: hashedPassword,
            phone: createUserDto.phone,
            address: createUserDto.address,
            avatar: createUserDto.avatar,
            role: createUserDto.role ?? user_entity_1.UserRole.BUYER,
            status: user_entity_1.UserStatus.ACTIVE,
        });
        const savedUser = await this.userRepository.save(user);
        return this.toResponse(savedUser);
    }
    async findAll(query) {
        const { search, role, status, page = 1, limit = 10 } = query;
        const qb = this.userRepository.createQueryBuilder('user');
        if (search) {
            qb.andWhere('(user.full_name ILIKE :search OR user.email ILIKE :search)', {
                search: `%${search}%`,
            });
        }
        if (role) {
            qb.andWhere('user.role = :role', { role });
        }
        if (status) {
            qb.andWhere('user.status = :status', { status });
        }
        qb.orderBy('user.created_at', 'DESC')
            .skip((page - 1) * limit)
            .take(limit);
        const [users, total] = await qb.getManyAndCount();
        return {
            items: users.map((user) => this.toResponse(user)),
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const user = await this.findUserEntity(id);
        return this.toResponse(user);
    }
    async update(id, updateUserDto) {
        const user = await this.findUserEntity(id);
        if (updateUserDto.email && updateUserDto.email !== user.email) {
            await this.ensureEmailNotTaken(updateUserDto.email);
        }
        const { full_name, ...rest } = updateUserDto;
        Object.assign(user, rest);
        if (full_name !== undefined) {
            user.fullName = full_name;
        }
        const updatedUser = await this.userRepository.save(user);
        return this.toResponse(updatedUser);
    }
    async lock(id) {
        return this.setStatus(id, user_entity_1.UserStatus.LOCKED, 'Khóa tài khoản thành công');
    }
    async unlock(id) {
        return this.setStatus(id, user_entity_1.UserStatus.ACTIVE, 'Mở khóa tài khoản thành công');
    }
    async resetPassword(id, resetPasswordDto) {
        const user = await this.findUserEntity(id);
        user.password = await bcrypt.hash(resetPasswordDto.password, SALT_ROUNDS);
        await this.userRepository.save(user);
        return { message: 'Reset password thành công' };
    }
    async remove(id) {
        const user = await this.findUserEntity(id);
        await this.userRepository.remove(user);
        return { message: 'Xóa User thành công' };
    }
    async findUserEntity(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('Không tìm thấy User');
        }
        return user;
    }
    async ensureEmailNotTaken(email) {
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new common_1.ConflictException('Email đã tồn tại');
        }
    }
    async setStatus(id, status, message) {
        const user = await this.findUserEntity(id);
        user.status = status;
        await this.userRepository.save(user);
        return { message };
    }
    toResponse(user) {
        const { password, ...result } = user;
        return result;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map