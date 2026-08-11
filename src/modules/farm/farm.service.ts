import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Farm } from './entities/farm.entity';
import { User } from '../users/entities/user.entity';
import { QueryFarmDto } from './dto/query-farm.dto';

@Injectable()
export class FarmService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateFarmDto) {
    const seller = await this.userRepository.findOne({
      where: {
        id: dto.sellerId,
      },
    });

    if (!seller) {
      throw new NotFoundException('Không tìm thấy Seller');
    }

    if (seller.role !== 'seller') {
      throw new ConflictException('User này không phải Seller');
    }

    const farm = this.farmRepository.create({
      farmName: dto.farmName,
      ownerName: dto.ownerName,
      address: dto.address,
      description: dto.description,
      seller: seller,
    });

    const savedFarm = await this.farmRepository.save(farm);

    return {
      success: true,
      message: 'Tạo nông trại thành công',
      data: savedFarm,
    };
  }

  async findAll(query: QueryFarmDto) {
    const { search, status, sellerId, page = 1, limit = 10 } = query;
    const qb = this.farmRepository
      .createQueryBuilder('farm')
      .leftJoinAndSelect('farm.seller', 'seller')
      .leftJoinAndSelect('farm.images', 'images');
    if (search) {
      qb.andWhere(
        '(farm.farmName ILIKE :search OR farm.ownerName ILIKE :search OR farm.address ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (status) {
      qb.andWhere('farm.status = :status', { status });
    }

    if (sellerId) {
      qb.andWhere('farm.sellerId = :sellerId', { sellerId });
    }

    qb.orderBy('farm.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [farms, total] = await qb.getManyAndCount();

    return {
      items: farms,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} farm`;
  }

  update(id: number, updateFarmDto: UpdateFarmDto) {
    return `This action updates a #${id} farm`;
  }

  remove(id: number) {
    return `This action removes a #${id} farm`;
  }
}
