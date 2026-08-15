import { CultivationLogsService } from './cultivation-logs.service';
import { CreateCultivationLogDto } from './dto/create-cultivation-log.dto';
import { UpdateCultivationLogDto } from './dto/update-cultivation-log.dto';
export declare class CultivationLogsController {
    private readonly logsService;
    constructor(logsService: CultivationLogsService);
    create(dto: CreateCultivationLogDto): Promise<import("./entities/cultivation-log.entity").CultivationLog>;
    findAllByBatch(batchId: number): Promise<import("./entities/cultivation-log.entity").CultivationLog[]>;
    findOne(id: number): Promise<import("./entities/cultivation-log.entity").CultivationLog>;
    update(id: number, dto: UpdateCultivationLogDto): Promise<import("./entities/cultivation-log.entity").CultivationLog>;
    remove(id: number): Promise<import("./entities/cultivation-log.entity").CultivationLog>;
}
