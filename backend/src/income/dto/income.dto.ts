import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination-query.dto';

export class CreateIncomeDto {
  @ApiProperty({
    example: 'Shopping with friend',
    description: 'This is the name of your Income',
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
  source: string;
}

export class UpdateIncomeDto extends PartialType(CreateIncomeDto) {}

export class IncomeFindAllDto extends IntersectionType(PaginationQueryDto) {}
