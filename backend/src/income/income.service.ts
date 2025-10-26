import {
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Income } from './schemas/income.schema';
import { Model, Types } from 'mongoose';
import { CreateIncomeDto, UpdateIncomeDto, IncomeFindAllDto } from './dto';
import { APIResponse } from '@app/util/response';
import { toNumber } from '@app/util/helper';
import { toOrder } from '@app/util/helper/db.helper';
import * as xlsx from 'xlsx';
@Injectable()
export class IncomeService {
  private readonly logger = new Logger(IncomeService.name);
  constructor(
    @InjectModel(Income.name)
    private readonly incomeModel: Model<Income>,
  ) {}
  async createIncome(userId: string, data: CreateIncomeDto) {
    this.logger.log(`Created new usage with ${JSON.stringify(data)}`);
    const { icon, description, amount, source } = data;

    const usage = await this.incomeModel.create({
      icon,
      description,
      amount,
      user_id: userId,
      source: source,
    });

    this.logger.log('Success new usage created');
    return new APIResponse(
      ['Create new uage success'],
      HttpStatus.CREATED,
      usage,
    );
  }

  async getAllIncomes(userId: string, data: IncomeFindAllDto) {
    this.logger.log(`Get all Incomes by this id ${JSON.stringify(userId)}`);
    const { page, limit, order } = data;
    const currentPage = toNumber(page, { default: 1 });
    const totalLimit = toNumber(limit, { default: 99999999 });
    const option = {
      where: {
        remove: false,
      },
      sort: {
        created: toOrder(order, 'asc'),
      },
      skip: (currentPage - 1) * totalLimit,
      limit: totalLimit,
    };
    this.logger.log(`Find All Incomes Options with ${JSON.stringify(option)}`);
    const totalCount = await this.incomeModel.countDocuments({
      user_id: userId,
    });
    const income = await this.incomeModel
      .find({ user_id: userId })
      .sort({ created: -1 })
      .skip(option.skip)
      .limit(option.limit)
      .exec();

    this.logger.log('Success incomes by user');
    return new APIResponse(['Get incomes by user success'], HttpStatus.CREATED, {
      data: income,
      totalCount,
    });
  }

  async findIncome(id: string) {
    this.logger.log(`Get Income by this id ${JSON.stringify(id)}`);
    const Income = await this.incomeModel
      .findById(id)
      .exec();
    this.logger.log('Success Income by id');
    return new APIResponse(
      ['Get Income by id success'],
      HttpStatus.CREATED,
      Income,
    );
  }

  async editIncome(id: string, userId: any, data: UpdateIncomeDto) {
    const { icon, description, amount, source } = data;
    const income = await this.incomeModel.findById(id);

    if (income.user_id !== userId) {
      throw new UnauthorizedException(`Invalid credentials, You cann't edit`);
    }
    income.icon = icon || income.icon;
    income.description = description || income.description;
    income.amount = +amount || income.amount;
    income.source = source || income.source;
    return await income.save();
  }

  async deleteIncome(id: string, userId: any) {
    const isUser = await this.incomeModel.findOne({
      user_id: userId,
    });

    if (!isUser) {
      throw new UnauthorizedException(`Invalid credentials, You cann't delete`);
    }
    return await this.incomeModel.deleteOne({
      _id: id,
    });
  }

  async downloadExcel(userId: string) {
    this.logger.log(`Get usage by group of user ${JSON.stringify(userId)}`);
    const incomes = await this.incomeModel
      .find({
        user_id: userId,
      })
      .sort({ created: -1 })
      .exec();

    const data = incomes.map((income) => ({
      category: income.source,
      amount: income.amount,
      data: income.created
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, 'income');

    // ✅ Write workbook to buffer (not to file)
    const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

    this.logger.log(`Excel generated for user ${userId}`);
    return buffer;
  }
}
