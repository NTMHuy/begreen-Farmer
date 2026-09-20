import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Import thêm FarmImageType từ Entity
import { FarmImage, FarmImageType } from '../entities/farm-image.entity';
import { Farm } from '../entities/farm.entity';

@Injectable()
export class FarmImageService {
  constructor(
    @InjectRepository(FarmImage)
    private imageRepo: Repository<FarmImage>,

    @InjectRepository(Farm)
    private farmRepo: Repository<Farm>,
  ) {}

  async upload(
    farmId: number,
    file: any,
    type: FarmImageType = FarmImageType.FARM,
  ) {
    const farm = await this.farmRepo.findOne({
      where: {
        id: farmId,
      },
    });

    if (!farm) throw new NotFoundException('Farm không tồn tại');

    const image = this.imageRepo.create({
      farm_id: farmId,
      image_url: file?.path || file?.filename || '',
      image_type: type,
    });

    return this.imageRepo.save(image);
  }

  async findByFarm(farmId: number) {
    return this.imageRepo.find({
      where: {
        farm_id: farmId,
      },
    });
  }

  async delete(imageId: number) {
    const image = await this.imageRepo.findOne({
      where: { id: imageId },
    });

    if (!image) {
      throw new NotFoundException('Ảnh không tồn tại');
    }

    return this.imageRepo.remove(image);
  }
}
