import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { getDatabaseConfig } from "./config/database.config";
import { UsersModule } from "./modules/users/users.module";
import { FarmModule } from "./modules/farm/farm.module";
import { CategoryModule } from "./modules/category/category.module";
import { ProductModule } from "./modules/product/product.module";
import { ApprovalModule } from "./modules/approval/approval.module";
import { CultivationLogsModule } from "./modules/cultivation-logs/cultivation-logs.module";
import { BatchesModule } from "./modules/batches/batches.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: getDatabaseConfig,
    }),

    FarmModule,

    BatchesModule,

    ApprovalModule,
    CultivationLogsModule,
    UsersModule,
    CategoryModule,
    ProductModule,
  ],
})
export class AppModule { }
