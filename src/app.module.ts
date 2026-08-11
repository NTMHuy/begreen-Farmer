import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getDatabaseConfig } from './config/database.config';
import { UsersModule } from './modules/users/users.module';
import { FarmModule } from './modules/farm/farm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: getDatabaseConfig,
    }),

    UsersModule,

    FarmModule,
  ],
})
export class AppModule {}
