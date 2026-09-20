import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FarmService } from './farm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farm } from './entities/farm.entity';
import { User } from '../users/entities/user.entity';
import { FarmImage } from './entities/farm-image.entity';
import { FarmAdminController } from './admin/farm-admin.controller';
import { FarmSellerController } from './seller/farm-seller.controller';
import { FarmImageController } from './images/farm-images.controller';
import { FarmImageService } from './images/farm-image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Farm, User, FarmImage]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/farms',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `farm-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  ],
  controllers: [FarmAdminController, FarmImageController, FarmSellerController],
  providers: [FarmService, FarmImageService],
})
export class FarmModule { }
