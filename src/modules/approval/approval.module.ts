import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApprovalService } from './approval.service';
import { ApprovalController } from './approval.controller';
import { Approval } from './entities/approval.entity';
import { Batch } from '../batches/entities/batch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Approval, Batch])],
  controllers: [ApprovalController],
  providers: [ApprovalService],
})
export class ApprovalModule {}