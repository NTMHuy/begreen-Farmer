import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateFarmDto {
  @IsString()
  @IsOptional()
  @MaxLength(150)
  farmName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  ownerName?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
