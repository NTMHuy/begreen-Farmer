import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Batch } from '../batches/entities/batch.entity';
import { Approval } from './entities/approval.entity';
import { ApproveBatchDto } from './dto/approve-batch.dto';
import { RejectBatchDto } from './dto/reject-batch.dto';
import { BatchApprovalStatus, ApprovalDecisionStatus } from '../common/enums';

@Injectable()
export class ApprovalService {
  constructor(
    @InjectRepository(Batch)
    private readonly batchRepository: Repository<Batch>,
    @InjectRepository(Approval)
    private readonly approvalRepository: Repository<Approval>,
  ) {}

  // Danh sách lô hàng đang chờ duyệt
  async findPending(): Promise<Batch[]> {
    return this.batchRepository.find({
      where: { approvalStatus: BatchApprovalStatus.PENDING },
      relations: { product: { farm: true }, cultivationLogs: true, images: true, approvals: true },
      order: { createdAt: 'ASC' },
    });
  }

  // Chi tiết 1 lô hàng — dùng để admin xem checklist trước khi quyết định
  async findOne(batchId: number): Promise<Batch> {
    const batch = await this.batchRepository.findOne({
      where: { id: batchId },
      relations: { product: { farm: true }, cultivationLogs: true, images: true, approvals: true },
    });
    if (!batch) {
      throw new NotFoundException(`Không tìm thấy lô hàng #${batchId}`);
    }
    return batch;
  }

  async approve(batchId: number, dto: ApproveBatchDto): Promise<Batch> {
    const batch = await this.findOne(batchId);

    if (batch.approvalStatus !== BatchApprovalStatus.PENDING) {
      throw new BadRequestException(
        `Lô hàng #${batchId} đã được xử lý trước đó (trạng thái hiện tại: ${batch.approvalStatus})`,
      );
    }

    batch.approvalStatus = BatchApprovalStatus.APPROVED;
    batch.trustLevel = dto.trustLevel;
    await this.batchRepository.save(batch);

    await this.approvalRepository.save(
      this.approvalRepository.create({
        batchId,
        adminId: dto.adminId,
        status: ApprovalDecisionStatus.APPROVED,
        note: dto.note ?? null,
      }),
    );

    return this.findOne(batchId);
  }

  async reject(batchId: number, dto: RejectBatchDto): Promise<Batch> {
    const batch = await this.findOne(batchId);

    if (batch.approvalStatus !== BatchApprovalStatus.PENDING) {
      throw new BadRequestException(
        `Lô hàng #${batchId} đã được xử lý trước đó (trạng thái hiện tại: ${batch.approvalStatus})`,
      );
    }

    batch.approvalStatus = BatchApprovalStatus.REJECTED;
    await this.batchRepository.save(batch);

    await this.approvalRepository.save(
      this.approvalRepository.create({
        batchId,
        adminId: dto.adminId,
        status: ApprovalDecisionStatus.REJECTED,
        note: dto.reason,
      }),
    );

    return this.findOne(batchId);
  }
}