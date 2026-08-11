import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FarmService } from './farm.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Query, ParseIntPipe } from '@nestjs/common';
import { QueryFarmDto } from './dto/query-farm.dto';

@Controller('admin/farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post()
  async create(@Body() createFarmDto: CreateFarmDto) {
    const data = await this.farmService.create(createFarmDto);
    return this.ok(data, 'Tạo Farm thành công');
  }

  @Get()
  async findAll(@Query() query: QueryFarmDto) {
    const data = await this.farmService.findAll(query);
    return this.ok(data, 'Lấy danh sách Farm thành công');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFarmDto: UpdateFarmDto) {
    return this.farmService.update(+id, updateFarmDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmService.remove(+id);
  }

  private ok<T>(data: T, message: string) {
    return { success: true, message, data };
  }
}
