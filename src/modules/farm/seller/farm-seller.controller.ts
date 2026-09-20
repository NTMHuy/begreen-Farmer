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
  DefaultValuePipe,
} from '@nestjs/common';

import { FarmService } from '../farm.service';
import { CreateFarmDto } from '../dto/create-farm.dto';
import { UpdateFarmDto } from '../dto/update-farm.dto';
import { QueryFarmDto } from '../dto/query-farm.dto';

@Controller('seller/farms')
export class FarmSellerController {
  constructor(private readonly farmService: FarmService) {}

  @Post()
  async create(@Body() dto: CreateFarmDto) {
    const data = await this.farmService.create(dto);
    return {
      success: true,
      message: 'Tạo Farm thành công',
      data,
    };
  }

  @Get()
  async findAll(
    @Query('seller_id', new DefaultValuePipe(2), ParseIntPipe) sellerId: number,
    @Query() query: QueryFarmDto,
  ) {
    const data = await this.farmService.findAllBySeller(sellerId, query);
    return {
      success: true,
      message: 'Lấy danh sách Farm thành công',
      data,
    };
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('seller_id', ParseIntPipe) sellerId: number,
  ) {
    const data = await this.farmService.findOneBySeller(id, sellerId);
    return {
      success: true,
      message: 'Lấy Farm thành công',
      data,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Query('seller_id', ParseIntPipe) sellerId: number,
    @Body() dto: UpdateFarmDto,
  ) {
    const data = await this.farmService.updateBySeller(id, sellerId, dto);
    return {
      success: true,
      message: 'Cập nhật Farm thành công',
      data,
    };
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Query('seller_id', ParseIntPipe) sellerId: number,
  ) {
    await this.farmService.removeBySeller(id, sellerId);
    return {
      success: true,
      message: 'Xóa Farm thành công',
    };
  }
}
