import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ProductService } from '../product.service';

import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Controller('seller/products')
export class ProductSellerController {
  constructor(private readonly productService: ProductService) {}

  // =========================
  // CREATE
  // =========================

  @Post()
  async create(@Body() dto: CreateProductDto) {
    const data = await this.productService.create(dto);

    return {
      success: true,
      message: 'Tạo sản phẩm thành công',
      data,
    };
  }

  // =========================
  // GET PRODUCTS BY FARM
  // =========================

  @Get()
  async findByFarm(
    @Query('farm_id', ParseIntPipe)
    farmId: number,
  ) {
    const data = await this.productService.findByFarm(farmId);

    return {
      success: true,
      message: 'Lấy danh sách sản phẩm thành công',
      data,
    };
  }

  // =========================
  // DETAIL
  // =========================

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.productService.findOne(id);

    return {
      success: true,
      message: 'Lấy thông tin sản phẩm thành công',
      data,
    };
  }

  // =========================
  // UPDATE
  // =========================

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,

    @Body()
    dto: UpdateProductDto,
  ) {
    const data = await this.productService.update(id, dto);

    return {
      success: true,
      message: 'Cập nhật sản phẩm thành công',
      data,
    };
  }

  // =========================
  // DELETE
  // =========================

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const data = await this.productService.remove(id);

    return {
      success: true,
      ...data,
    };
  }
}
