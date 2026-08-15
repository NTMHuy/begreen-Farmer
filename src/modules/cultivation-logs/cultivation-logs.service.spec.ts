import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CultivationLog } from './entities/cultivation-log.entity';
import { CreateCultivationLogDto } from './dto/create-cultivation-log.dto';
import { UpdateCultivationLogDto } from './dto/update-cultivation-log.dto';

@Injectable()
export class CultivationLogsService {
  constructor(
    @InjectRepository(CultivationLog)
    private readonly logRepository: Repository<CultivationLog>,
  ) {}

  create(dto: CreateCultivationLogDto) {
    return this.logRepository.save(this.logRepository.create(dto));
  }

  findAllByBatch(batchId: number) {
    return this.logRepository.find({ where: { batchId }, order: { logDate: 'ASC' } });
  }

  async findOne(id: number) {
    const log = await this.logRepository.findOne({ where: { id } });
    if (!log) throw new NotFoundException(`Không tìm thấy nhật ký #${id}`);
    return log;
  }

  async update(id: number, dto: UpdateCultivationLogDto) {
    const log = await this.findOne(id);
    Object.assign(log, dto);
    return this.logRepository.save(log);
  }

  async remove(id: number) {
    const log = await this.findOne(id);
    return this.logRepository.remove(log);
  }
}