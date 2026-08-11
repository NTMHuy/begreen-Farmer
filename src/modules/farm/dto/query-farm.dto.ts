import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

import { FarmStatus } from '../entities/farm.entity';

export class QueryFarmDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page?: number = 1;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit?: number = 10;

  @IsEnum(FarmStatus)
  @IsOptional()
  status?: FarmStatus;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  sellerId?: number;
}
