import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { Farm } from '../../farm/entities/farm.entity';
import { Category } from '../../category/entities/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  // =========================
  // FARM
  // =========================

  @Column({
    name: 'farm_id',
  })
  farm_id: number;

  @ManyToOne(() => Farm, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'farm_id',
  })
  farm: Farm;

  // =========================
  // CATEGORY
  // =========================

  @Column({
    name: 'category_id',
  })
  category_id: number;

  @ManyToOne(() => Category, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({
    name: 'category_id',
  })
  category: Category;

  // =========================
  // PRODUCT INFO
  // =========================

  @Column({
    length: 150,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
  })
  price: number;

  // =========================
  // CREATED
  // =========================

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date;
}
