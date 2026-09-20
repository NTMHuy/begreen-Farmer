import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
  Body,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FarmImageService } from './farm-image.service';
import { CreateFarmImageDto } from './dto/upload-image.dto';

@Controller('seller/farms')
export class FarmImageController {
  constructor(private readonly service: FarmImageService) {}

  @Post(':id/images')
  @UseInterceptors(FileInterceptor('image'))
  async upload(
    @Param('id', ParseIntPipe) id: number, // Dùng ParseIntPipe để tự ép sang number
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateFarmImageDto,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Vui lòng chọn file ảnh để tải lên (Key: image)',
      );
    }

    return this.service.upload(id, file, dto.image_type);
  }

  @Get(':id/images')
  findImages(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByFarm(id);
  }

  // 🟢 BỔ SUNG: Route xóa ảnh (Khớp với FE: DELETE /seller/farms/images/:imageId)
  @Delete('images/:imageId')
  async deleteImage(@Param('imageId', ParseIntPipe) imageId: number) {
    await this.service.delete(imageId); // Đảm bảo trong service có hàm delete()
    return {
      success: true,
      message: 'Xóa ảnh thành công',
    };
  }
}
