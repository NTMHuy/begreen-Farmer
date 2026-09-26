import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBatchDto } from './dto/create-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { Batch } from './entities/batch.entity';
import { Product } from '../product/entities/product.entity';
import { BatchApprovalStatus } from '../common/enums';

@Injectable()
export class BatchesService {
  constructor(
    @InjectRepository(Batch)
    private readonly batchRepository: Repository<Batch>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Seller tạo lô: luôn ở trạng thái Pending (default của cột approval_status)
  async create(dto: CreateBatchDto): Promise<Batch> {
    const product = await this.productRepository.findOne({
      where: { id: dto.productId },
      relations: { farm: true },
    });
    if (!product) {
      throw new NotFoundException(`Không tìm thấy sản phẩm #${dto.productId}`);
    }
    if (product.farm.seller_id !== dto.sellerId) {
      throw new ForbiddenException('Sản phẩm này không thuộc nông trại của bạn');
    }
    if (dto.plantingDate && dto.harvestDate < dto.plantingDate) {
      throw new BadRequestException('Ngày thu hoạch phải sau hoặc bằng ngày gieo');
    }

    const saved = await this.batchRepository.save(
      this.batchRepository.create({
        productId: dto.productId,
        plantingDate: dto.plantingDate,
        harvestDate: dto.harvestDate,
        quantity: dto.quantity,
        cultivationLogs: (dto.cultivationLogs ?? []).map((log) => ({
          activity: log.activity,
          description: log.description ?? null,
          logDate: log.logDate,
        })),
      }),
    );
    return this.findOne(saved.id);
  }

  // Danh sách lô của 1 seller
  findAllBySeller(sellerId: number): Promise<Batch[]> {
    return this.batchRepository.find({
      where: { product: { farm: { seller_id: sellerId } } },
      relations: { product: { farm: true }, images: true },
      order: { createdAt: 'DESC' },
    });
  }

  // Chi tiết lô (seller dùng để hiện QR khi đã Approved)
  async findOne(id: number): Promise<Batch> {
    const batch = await this.batchRepository.findOne({
      where: { id },
      relations: { product: { farm: true }, cultivationLogs: true, images: true },
    });
    if (!batch) {
      throw new NotFoundException(`Không tìm thấy lô hàng #${id}`);
    }
    return batch;
  }

  // Public: tra cứu qua mã QR, chỉ trả lô đã duyệt
  async findByBarcodeForTrace(code: string): Promise<Batch> {
    const batch = await this.batchRepository.findOne({
      where: { barcode: code, approvalStatus: BatchApprovalStatus.APPROVED },
      relations: { product: { farm: true }, cultivationLogs: true, images: true },
    });
    if (!batch) {
      throw new NotFoundException('Không tìm thấy lô hàng hoặc lô chưa được xác minh');
    }
    return batch;
  }

  update(id: number, updateBatchDto: UpdateBatchDto) {
    return `This action updates a #${id} batch`;
  }

  remove(id: number) {
    return `This action removes a #${id} batch`;
  }
}