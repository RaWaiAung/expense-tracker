import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';

export class CreateUsageDto {
  @ApiProperty({
    example: 'Shopping with friend',
    description: 'This is the name of your usage',
  })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  created: string;
}

export class UpdateUsageDto extends PartialType(CreateUsageDto) {}

export class UsageFindAllDto extends IntersectionType(PaginationQueryDto) {}
