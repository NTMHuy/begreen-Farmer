import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { Farm } from '../farm/entities/farm.entity';
import { Category } from '../category/entities/category.entity';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // =========================
  // CREATE
  // =========================

  async create(dto: CreateProductDto) {
    // Kiểm tra Farm
    const farm = await this.farmRepository.findOne({
      where: {
        id: dto.farm_id,
      },
    });

    if (!farm) {
      throw new NotFoundException('Không tìm thấy nông trại');
    }

    // Chỉ cho tạo Product nếu Farm đã được duyệt
    if (farm.status !== 'approved') {
      throw new BadRequestException('Nông trại chưa được Admin duyệt');
    }

    // Kiểm tra Category
    const category = await this.categoryRepository.findOne({
      where: {
        id: dto.category_id,
      },
    });

    if (!category) {
      throw new NotFoundException('Danh mục không tồn tại hoặc đã bị khóa');
    }

    const product = this.productRepository.create({
      farm_id: dto.farm_id,
      category_id: dto.category_id,
      name: dto.name,
      description: dto.description,
      price: dto.price,
    });

    return this.productRepository.save(product);
  }

  // =========================
  // GET ALL
  // =========================

  async findAll() {
    return this.productRepository.find({
      relations: {
        farm: true,
        category: true,
      },

      order: {
        created_at: 'DESC',
      },
    });
  }

  // =========================
  // GET BY FARM
  // =========================

  async findByFarm(farmId: number) {
    return this.productRepository.find({
      where: {
        farm_id: farmId,
      },

      relations: {
        category: true,
      },

      order: {
        created_at: 'DESC',
      },
    });
  }

  // =========================
  // GET ONE
  // =========================

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },

      relations: {
        farm: true,
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException('Không tìm thấy sản phẩm');
    }

    return product;
  }

  // =========================
  // UPDATE
  // =========================

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.findOne(id);

    if (dto.category_id) {
      const category = await this.categoryRepository.findOne({
        where: {
          id: dto.category_id,
        },
      });

      if (!category) {
        throw new NotFoundException('Danh mục không tồn tại hoặc đã bị khóa');
      }
    }

    Object.assign(product, dto);

    return this.productRepository.save(product);
  }

  // =========================
  // DELETE
  // =========================

  async remove(id: number) {
    const product = await this.findOne(id);

    await this.productRepository.remove(product);

    return {
      message: 'Xóa sản phẩm thành công',
    };
  }
}
