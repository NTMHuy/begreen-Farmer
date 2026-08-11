import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class CreateFarmDto {
  @IsInt()
  sellerId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  farmName: string;

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
