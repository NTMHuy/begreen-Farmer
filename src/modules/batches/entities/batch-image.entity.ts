import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Batch } from './batch.entity';

@Entity('batch_images')
export class BatchImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'batch_id' })
  batchId: number;

  @ManyToOne(() => Batch, (batch) => batch.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'batch_id' })
  batch: Batch;

  @Column({ name: 'image_url', length: 255 })
  imageUrl: string;
}