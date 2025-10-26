import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Income } from '../income/schemas';
import { Usage } from '../usage/schemas';
import { APIResponse } from '@app/util/response';

@Injectable()
export class DashboardService {
    private readonly logger = new Logger(DashboardService.name);
    constructor(
        @InjectModel(Income.name)
        private readonly incomeModel: Model<Income>,
        @InjectModel(Usage.name)
        private readonly usageModel: Model<Usage>,
    ) { }

    async getDashboardData(userId: string) {
        this.logger.log(`Getting dashboard data for user ${userId}`);
        const now = new Date();
        const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        const userFilter = { user_id: userId, removed: false };
        const [totalIncomeAgg,
            totalExpenseAgg,
            last60DaysIncome,
            last30DaysUsage,
            last5Income,
            last5Usage] = await Promise.all([
                this.incomeModel.aggregate([
                    { $match: userFilter },
                    { $group: { _id: null, total: { $sum: '$amount' } } },
                ]),
                this.usageModel.aggregate([
                    { $match: userFilter },
                    { $group: { _id: null, total: { $sum: '$amount' } } },
                ]),
                this.incomeModel.find({ ...userFilter, created: { $gte: sixtyDaysAgo } }).sort({ created: -1 }),
                this.usageModel.find({ ...userFilter, created: { $gte: thirtyDaysAgo } }).sort({ created: -1 }),
                this.incomeModel.find(userFilter).sort({ created: -1 }).limit(5),
                this.usageModel.find(userFilter).sort({ created: -1 }).limit(5),
            ]);
        const totalIncome = totalIncomeAgg[0]?.total || 0;
        const totalExpense = totalExpenseAgg[0]?.total || 0;
        const incomeLast60Days = last60DaysIncome.reduce((sum, r) => sum + r.amount, 0);
        const usageLast30Days = last30DaysUsage.reduce((sum, r) => sum + r.amount, 0);

        const lastTransactions = [
            ...last5Income.map(i => ({ ...i.toObject(), type: 'income' })),
            ...last5Usage.map(u => ({ ...u.toObject(), type: 'usage' })),
        ].sort((a, b) => b.created.getTime() - a.created.getTime());

        const last30DaysUsageWithType = last30DaysUsage.map(u => ({
            ...u.toObject(),
            type: 'expense',
        }));

        const last60DaysIncomeWithType = last60DaysIncome.map(i => ({
            ...i.toObject(),
            type: 'income',
        }));

        this.logger.log(`Dashboard data retrieved for user ${userId}`);

        this.logger.log(`Dashboard data retrieved for user ${userId}`);
        return new APIResponse(
            ['Get all dashboard success'],
            HttpStatus.OK,
            {
                totalBalance: totalIncome - totalExpense,
                totalIncome,
                totalExpense,
                last30DaysUsage: {
                    total: usageLast30Days,
                    data: last30DaysUsageWithType,
                },
                last60DaysIncome: {
                    total: incomeLast60Days,
                    data: last60DaysIncomeWithType,
                },
                lastTransactions,
            }
        );
    }
}
