import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { FarmImage } from './farm-image.entity';

export enum FarmStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
}

@Entity('farms')
export class Farm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'seller_id' })
  sellerId: number;

  @ManyToOne(() => User, (user) => user.farms, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @Column({
    name: 'farm_name',
    length: 150,
  })
  farmName: string;

  @Column({
    name: 'owner_name',
    length: 100,
    nullable: true,
  })
  ownerName: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  address: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: FarmStatus,
    default: FarmStatus.ACTIVE,
  })
  status: FarmStatus;

  @OneToMany(() => FarmImage, (farmImage) => farmImage.farm, {
    cascade: true,
  })
  images: FarmImage[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
