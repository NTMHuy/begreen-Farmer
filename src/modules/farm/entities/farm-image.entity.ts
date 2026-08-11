import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Farm } from './farm.entity';

@Entity('farm_images')
export class FarmImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'farm_id',
  })
  farmId: number;

  @ManyToOne(() => Farm, (farm) => farm.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'farm_id',
  })
  farm: Farm;

  @Column({
    name: 'image_url',
    length: 500,
  })
  imageUrl: string;

  @Column({
    name: 'image_type',
    length: 50,
    nullable: true,
  })
  imageType: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
}
