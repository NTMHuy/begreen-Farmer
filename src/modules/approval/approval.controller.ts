import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApprovalService } from './approval.service';
import { ApproveBatchDto } from './dto/approve-batch.dto';
import { RejectBatchDto } from './dto/reject-batch.dto';

@Controller('approval')
export class ApprovalController {
  constructor(private readonly approvalService: ApprovalService) {}

  // ⚠️ Route tĩnh 'pending' PHẢI khai báo TRƯỚC route động ':batchId',
  // nếu không NestJS sẽ hiểu 'pending' là giá trị của :batchId
  @Get('pending')
  findPending() {
    return this.approvalService.findPending();
  }

  @Get(':batchId')
  findOne(@Param('batchId', ParseIntPipe) batchId: number) {
    return this.approvalService.findOne(batchId);
  }

  @Post(':batchId/approve')
  approve(
    @Param('batchId', ParseIntPipe) batchId: number,
    @Body() dto: ApproveBatchDto,
  ) {
    return this.approvalService.approve(batchId, dto);
  }

  @Post(':batchId/reject')
  reject(
    @Param('batchId', ParseIntPipe) batchId: number,
    @Body() dto: RejectBatchDto,
  ) {
    return this.approvalService.reject(batchId, dto);
  }
}