import { Module } from '@nestjs/common';
import { FarmService } from './farm.service';
import { FarmController } from './farm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farm } from './entities/farm.entity';
import { User } from '../users/entities/user.entity';
import { FarmImage } from './entities/farm-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farm, User, FarmImage])],
  controllers: [FarmController],
  providers: [FarmService],
})
export class FarmModule {}
