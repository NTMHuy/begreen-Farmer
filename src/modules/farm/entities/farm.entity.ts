import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { FarmImage } from './farm-image.entity';
import { Product } from '../../product/entities/product.entity';

export enum FarmStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum TrustLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity('farms')
export class Farm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'seller_id' })
  seller_id: number;

  @ManyToOne(() => User, (user) => user.farms, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @Column({ name: 'farm_name', length: 150 })
  farm_name: string;

  @Column({ name: 'owner_name', length: 100, nullable: true })
  owner_name: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    name: 'area_ha',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  area_ha: number;

  @Column({
    name: 'farming_method',
    length: 150,
    nullable: true,
  })
  farming_method: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
    nullable: true,
  })
  latitude: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
    nullable: true,
  })
  longitude: number;

  @Column({
    name: 'trust_level',
    type: 'enum',
    enum: TrustLevel,
    default: TrustLevel.LOW,
  })
  trust_level: TrustLevel;

  @Column({
    type: 'enum',
    enum: FarmStatus,
    default: FarmStatus.PENDING,
  })
  status: FarmStatus;

  @OneToMany(() => FarmImage, (image) => image.farm, {
    cascade: true,
  })
  images: FarmImage[];

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updated_at: Date;
}
