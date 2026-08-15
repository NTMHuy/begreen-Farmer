import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { CultivationLogsService } from './cultivation-logs.service';
import { CreateCultivationLogDto } from './dto/create-cultivation-log.dto';
import { UpdateCultivationLogDto } from './dto/update-cultivation-log.dto';

@Controller('cultivation-logs')
export class CultivationLogsController {
  constructor(private readonly logsService: CultivationLogsService) {}

  @Post()
  create(@Body() dto: CreateCultivationLogDto) {
    return this.logsService.create(dto);
  }

  @Get()
  findAllByBatch(@Query('batchId', ParseIntPipe) batchId: number) {
    return this.logsService.findAllByBatch(batchId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.logsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCultivationLogDto) {
    return this.logsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.logsService.remove(id);
  }
}