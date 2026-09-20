import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, Repository } from 'typeorm';

import { Farm } from './entities/farm.entity';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { QueryFarmDto } from './dto/query-farm.dto';
import { User, UserRole } from '../users/entities/user.entity';
import { FarmStatus } from './entities/farm.entity';

@Injectable()
export class FarmService {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateFarmDto): Promise<Farm> {
    const seller = await this.findSellerEntity(dto.seller_id);

    const farm = this.farmRepository.create({
      ...dto,
      seller,
      status: FarmStatus.PENDING,
    });

    return this.farmRepository.save(farm);
  }

  async findAll(query: QueryFarmDto) {
    const { search, status, seller_id, page = 1, limit = 10 } = query;

    const qb = this.farmRepository
      .createQueryBuilder('farm')
      .leftJoinAndSelect('farm.seller', 'seller')
      .leftJoinAndSelect('farm.images', 'images');

    if (search) {
      qb.andWhere(
        '(farm.farm_name ILIKE :search OR farm.address ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (status) {
      qb.andWhere('farm.status = :status', { status });
    }

    if (seller_id) {
      qb.andWhere('farm.seller_id = :seller_id', { seller_id });
    }

    qb.orderBy('farm.created_at', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findAllBySeller(sellerId: number, query: QueryFarmDto) {
    return this.findAll({ ...query, seller_id: sellerId });
  }

  async findOne(id: number): Promise<Farm> {
    return this.findFarmEntity(id, {
      relations: { seller: true, images: true },
    });
  }

  async findOneBySeller(id: number, sellerId: number): Promise<Farm> {
    const farm = await this.findFarmEntity(id, {
      relations: { images: true },
    });
    this.ensureFarmOwnership(farm, sellerId);
    return farm;
  }

  async updateBySeller(
    id: number,
    sellerId: number,
    dto: UpdateFarmDto,
  ): Promise<Farm> {
    const farm = await this.findOneBySeller(id, sellerId);
    Object.assign(farm, dto);
    return this.farmRepository.save(farm);
  }

  async removeBySeller(id: number, sellerId: number): Promise<void> {
    const farm = await this.findOneBySeller(id, sellerId);
    await this.farmRepository.remove(farm);
  }

  async approve(id: number): Promise<Farm> {
    return this.setStatus(id, FarmStatus.APPROVED);
  }

  async reject(id: number, note?: string): Promise<Farm> {
    // Nếu bạn có cột lưu note từ chối, có thể xử lý gắn vào đây
    return this.setStatus(id, FarmStatus.REJECTED);
  }

  // =========================
  // PRIVATE HELPERS
  // =========================

  private async findFarmEntity(
    id: number,
    options?: { relations?: FindOptionsRelations<Farm> },
  ): Promise<Farm> {
    const farm = await this.farmRepository.findOne({
      where: { id },
      relations: options?.relations,
    });

    if (!farm) {
      throw new NotFoundException('Không tìm thấy Farm');
    }
    return farm;
  }

  private ensureFarmOwnership(farm: Farm, sellerId: number): void {
    if (farm.seller_id !== sellerId) {
      throw new ForbiddenException('Bạn không có quyền truy cập Farm này');
    }
  }

  private async findSellerEntity(sellerId: number): Promise<User> {
    const seller = await this.userRepository.findOne({
      where: { id: sellerId },
    });

    if (!seller) {
      throw new NotFoundException('Không tìm thấy Seller');
    }
    if (seller.role !== UserRole.SELLER) {
      throw new ConflictException('User này không phải Seller');
    }
    return seller;
  }

  private async setStatus(id: number, status: FarmStatus): Promise<Farm> {
    const farm = await this.findFarmEntity(id);
    farm.status = status;
    return this.farmRepository.save(farm);
  }
}
