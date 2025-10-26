import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { UsageModule } from '../usage/usage.module';
import { IncomeModule } from '../income/income.module';
import { JwtModule } from '@app/util/auth';

@Module({
  imports: [
    JwtModule,
    IncomeModule,
    UsageModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
