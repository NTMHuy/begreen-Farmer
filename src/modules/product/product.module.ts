import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from './entities/product.entity';
import { Farm } from '../farm/entities/farm.entity';
import { Category } from '../category/entities/category.entity';

import { ProductService } from './product.service';

import { ProductAdminController } from './admin/product-admin.controller';
import { ProductSellerController } from './seller/product-seller.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Farm, Category])],

  controllers: [ProductAdminController, ProductSellerController],

  providers: [ProductService],

  exports: [ProductService],
})
export class ProductModule { }
