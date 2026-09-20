import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Body,
} from '@nestjs/common';

import { ProductService } from '../product.service';
import { UpdateProductDto } from '../dto/update-product.dto';

@Controller('admin/products')
export class ProductAdminController {
  constructor(private readonly productService: ProductService) {}

  // =========================
  // GET ALL
  // =========================

  @Get()
  async findAll() {
    const data = await this.productService.findAll();

    return {
      success: true,
      message: 'Lấy danh sách sản phẩm thành công',
      data,
    };
  }

  // =========================
  // GET ONE
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
