import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { Farm } from './farm.entity';

// 1. Thêm export enum FarmImageType
export enum FarmImageType {
  FARM = 'farm',
  CERTIFICATE = 'certificate',
}

@Entity('farm_images')
export class FarmImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'farm_id' })
  farm_id: number;

  @ManyToOne(() => Farm, (farm) => farm.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'farm_id' })
  farm: Farm;

  @Column({
    name: 'image_url',
    length: 500,
  })
  image_url: string;

  // 2. Cập nhật kiểu dữ liệu sử dụng Enum
  @Column({
    name: 'image_type',
    type: 'enum',
    enum: FarmImageType,
    default: FarmImageType.FARM,
  })
  image_type: FarmImageType;

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date;
}