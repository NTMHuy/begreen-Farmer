import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { CategoryAdminController } from '../category/admin/category.-admincontroller';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryAdminController],

  providers: [CategoryService],

  exports: [CategoryService],
})
export class CategoryModule { }
