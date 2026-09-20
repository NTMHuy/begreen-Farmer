import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // =========================
  // CREATE
  // =========================

  async create(dto: CreateCategoryDto) {
    const existing = await this.categoryRepository.findOne({
      where: {
        name: dto.name,
      },
    });

    if (existing) {
      throw new ConflictException('Danh mục đã tồn tại');
    }

    const category = this.categoryRepository.create({
      name: dto.name,
      description: dto.description,
    });

    return this.categoryRepository.save(category);
  }

  // =========================
  // GET ALL
  // =========================

  async findAll() {
    return this.categoryRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  // =========================
  // GET ONE
  // =========================

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Không tìm thấy danh mục');
    }

    return category;
  }

  // =========================
  // UPDATE
  // =========================

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    if (dto.name && dto.name !== category.name) {
      const existing = await this.categoryRepository.findOne({
        where: {
          name: dto.name,
        },
      });

      if (existing) {
        throw new ConflictException('Tên danh mục đã tồn tại');
      }
    }

    Object.assign(category, dto);

    return this.categoryRepository.save(category);
  }

  // =========================
  // DELETE
  // =========================

  async remove(id: number) {
    const category = await this.findOne(id);

    await this.categoryRepository.remove(category);

    return {
      message: 'Xóa danh mục thành công',
    };
  }
}
