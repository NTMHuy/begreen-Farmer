import { Repository } from 'typeorm';
import { CultivationLog } from './entities/cultivation-log.entity';
import { CreateCultivationLogDto } from './dto/create-cultivation-log.dto';
import { UpdateCultivationLogDto } from './dto/update-cultivation-log.dto';
export declare class CultivationLogsService {
    private readonly logRepository;
    constructor(logRepository: Repository<CultivationLog>);
    create(dto: CreateCultivationLogDto): Promise<CultivationLog>;
    findAllByBatch(batchId: number): Promise<CultivationLog[]>;
    findOne(id: number): Promise<CultivationLog>;
    update(id: number, dto: UpdateCultivationLogDto): Promise<CultivationLog>;
    remove(id: number): Promise<CultivationLog>;
}
