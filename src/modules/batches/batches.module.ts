import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BatchesService } from './batches.service';
import { BatchesController } from './batches.controller';
import { Batch } from './entities/batch.entity';
import { BatchImage } from './entities/batch-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Batch, BatchImage])],
  controllers: [BatchesController],
  providers: [BatchesService],
  exports: [TypeOrmModule],
})
export class BatchesModule {}