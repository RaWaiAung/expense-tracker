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
} from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto, IncomeFindAllDto, UpdateIncomeDto } from './dto';
import { GetUser } from '../auth/decorator/user.decorator';
import { AuthGuard } from '../auth/guards';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('income')
@ApiTags('Income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Post('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  createIncome(@GetUser('id') userId: string, @Body() data: CreateIncomeDto) {
    return this.incomeService.createIncome(userId, data);
  }

  @Get('download/excel')
  @UseGuards(AuthGuard)
  async getByCategory(@GetUser('id') userId: string,  @Res() res: Response,) {
    const excelBuffer = await this.incomeService.downloadExcel(userId);

    // ✅ Set correct headers for Excel file
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="Income-${userId}.xlsx"`,
      'Content-Length': excelBuffer.length,
    });

    res.end(excelBuffer);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  getAllIncomes(@GetUser('id') userId: string, @Query() data: IncomeFindAllDto) {
    return this.incomeService.getAllIncomes(userId, data);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findIncome(@Param('id') id: string) {
    return this.incomeService.findIncome(id);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  downloadIncomeExcel(@Param('id') id: string) {
    return this.incomeService.findIncome(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  editIncome(
    @Param('id') id: string,
    @GetUser('id') userId: number,
    @Body() data: UpdateIncomeDto,
  ) {
    return this.incomeService.editIncome(id, userId, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteIncome(@GetUser('id') userId: number, @Param('id') id: string) {
    return this.incomeService.deleteIncome(id, userId);
  }
}
