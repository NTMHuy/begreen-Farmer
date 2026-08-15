import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultivationLogsService } from './cultivation-logs.service';
import { CultivationLogsController } from './cultivation-logs.controller';
import { CultivationLog } from './entities/cultivation-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CultivationLog])],
  controllers: [CultivationLogsController],
  providers: [CultivationLogsService],
  exports: [CultivationLogsService],
})
export class CultivationLogsModule {}