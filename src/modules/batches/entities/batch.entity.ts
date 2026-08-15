import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';
import { CultivationLog } from '../../cultivation-logs/entities/cultivation-log.entity';
import { BatchImage } from './batch-image.entity';
import { Approval } from '../../approval/entities/approval.entity';
import { BatchApprovalStatus, TrustLevel } from '../../common/enums';

@Entity('batches')
export class Batch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'product_id' })
  productId: number;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ name: 'batch_code', length: 50, unique: true })
  batchCode: string;

  @Column({ name: 'planting_date', type: 'date', nullable: true })
  plantingDate: string;

  @Column({ name: 'harvest_date', type: 'date' })
  harvestDate: string;

  @Column({ type: 'int' })
  quantity: number;

  // Mã dùng để sinh QR truy xuất nguồn gốc (Giai đoạn 3 & 4).
  // Được hệ thống tự sinh khi Admin bấm "Duyệt & tạo QR".
  @Column({ length: 255, nullable: true })
  barcode: string;

  @Column({
    name: 'trust_level',
    type: 'enum',
    enum: TrustLevel,
    nullable: true,
  })
  trustLevel: TrustLevel | null;

  @Column({
    name: 'approval_status',
    type: 'enum',
    enum: BatchApprovalStatus,
    default: BatchApprovalStatus.PENDING,
  })
  approvalStatus: BatchApprovalStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => CultivationLog, (log) => log.batch)
  cultivationLogs: CultivationLog[];

  @OneToMany(() => BatchImage, (image) => image.batch)
  images: BatchImage[];

  @OneToMany(() => Approval, (approval) => approval.batch)
  approvals: Approval[];
}