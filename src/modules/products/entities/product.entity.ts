import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Farm } from '../../farm/entities/farm.entity';
import { Batch } from '../../batches/entities/batch.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'farm_id' })
  farmId: number;

  @ManyToOne(() => Farm, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'farm_id' })
  farm: Farm;

  // TODO: module 'categories' chưa được tạo — tạm để category_id dạng cột thường,
  // chưa gắn quan hệ ManyToOne. Sẽ nối lại khi module categories được xây.
  @Column({ name: 'category_id' })
  categoryId: number;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Batch, (batch) => batch.product)
  batches: Batch[];
}