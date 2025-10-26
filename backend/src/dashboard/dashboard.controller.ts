import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('dashboard')
@ApiTags('Dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }
  @Get('/')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  getDashboardData(@GetUser('id') userId: number) {
    return this.dashboardService.getDashboardData(userId.toString());
  }
}
