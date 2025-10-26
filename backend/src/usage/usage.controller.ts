import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { UsageService } from './usage.service';
import { CreateUsageDto, UsageFindAllDto, UpdateUsageDto } from './dto';
import { GetUser } from '../auth/decorator/user.decorator';
import { AuthGuard } from '../auth/guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('usage')
@ApiTags('Usage')
export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  @Post('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  createUsage(@GetUser('id') userId: string, @Body() data: CreateUsageDto) {
    return this.usageService.createUsage(userId, data);
  }

  @Get('download/excel')
  @UseGuards(AuthGuard)
  async getByCategory(
    @GetUser('id') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const excelBuffer = await this.usageService.downloadExcel(userId);

    // ✅ Set correct headers for Excel file
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="usage-${userId}.xlsx"`,
      'Content-Length': excelBuffer.length,
    });

    return new StreamableFile(excelBuffer);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  getAllUsages(@GetUser('id') userId: string, @Query() data: UsageFindAllDto) {
    return this.usageService.getAllUsages(userId, data);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findUsage(@Param('id') id: string) {
    return this.usageService.findUsage(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  downloadIncomeExcel(@Param('id') id: string) {
    return this.usageService.findUsage(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  editUsage(
    @Param('id') id: string,
    @GetUser('id') userId: number,
    @Body() data: UpdateUsageDto,
  ) {
    return this.usageService.editUsage(id, userId, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteUsage(@GetUser('id') userId: number, @Param('id') id: string) {
    return this.usageService.deleteUsage(id, userId);
  }
}
