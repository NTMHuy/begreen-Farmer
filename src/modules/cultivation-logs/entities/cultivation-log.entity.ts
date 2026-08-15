import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Batch } from '../../batches/entities/batch.entity';

@Entity('cultivation_logs')
export class CultivationLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'batch_id' })
  batchId: number;

  @ManyToOne(() => Batch, (batch) => batch.cultivationLogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'batch_id' })
  batch: Batch;

  @Column({ length: 150 })
  activity: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string | null;

  @Column({ name: 'log_date', type: 'date' })
  logDate: string;
}