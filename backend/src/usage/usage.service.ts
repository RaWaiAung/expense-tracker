import {
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usage } from './schemas/usage.schema';
import { Model, Types } from 'mongoose';
import { CreateUsageDto, UpdateUsageDto, UsageFindAllDto } from './dto';
import { APIResponse } from '@app/util/response';
import { toNumber } from '@app/util/helper';
import { toOrder } from '@app/util/helper/db.helper';
import * as xlsx from 'xlsx';
@Injectable()
export class UsageService {
  private readonly logger = new Logger(UsageService.name);
  constructor(
    @InjectModel(Usage.name)
    private readonly expenseModel: Model<Usage>,
  ) {}
  async createUsage(userId: string, data: CreateUsageDto) {
    this.logger.log(`Created new usage with ${JSON.stringify(data)}`);
    const { icon, description, amount, category, created } = data;

    const usage = await this.expenseModel.create({
      icon,
      description,
      amount,
      user_id: userId,
      category: category,
      created,
    });

    this.logger.log('Success new usage created');
    return new APIResponse(
      ['Create new uage success'],
      HttpStatus.CREATED,
      usage,
    );
  }

  async getAllUsages(userId: string, data: UsageFindAllDto) {
    this.logger.log(`Get all usages by this id ${JSON.stringify(userId)}`);
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
    this.logger.log(`Find All Usages Options with ${JSON.stringify(option)}`);
    const totalCount = await this.expenseModel.countDocuments({
      user_id: userId,
    });
    const usage = await this.expenseModel
      .find({ user_id: userId })
      .sort({ created: -1 })
      .skip(option.skip)
      .limit(option.limit)
      .exec();

    this.logger.log('Success usages by user');
    return new APIResponse(['Get usages by user success'], HttpStatus.CREATED, {
      data: usage,
      totalCount,
    });
  }

  async findUsage(id: string) {
    this.logger.log(`Get usage by this id ${JSON.stringify(id)}`);
    const usage = await this.expenseModel
      .findById(id)
      .exec();
    this.logger.log('Success usage by id');
    return new APIResponse(
      ['Get usage by id success'],
      HttpStatus.CREATED,
      usage,
    );
  }

  async editUsage(id: string, userId: any, data: UpdateUsageDto) {
    const { icon, description, amount, category } = data;
    const usage = await this.expenseModel.findById(id);

    if (usage.user_id !== userId) {
      throw new UnauthorizedException(`Invalid credentials, You cann't edit`);
    }
    usage.icon = icon || usage.icon;
    usage.description = description || usage.description;
    usage.amount = +amount || usage.amount;
    usage.category = category || usage.category;
    return await usage.save();
  }

  async deleteUsage(id: string, userId: any) {
    const isUser = await this.expenseModel.findOne({
      user_id: userId,
    });

    if (!isUser) {
      throw new UnauthorizedException(`Invalid credentials, You cann't delete`);
    }
    return await this.expenseModel.deleteOne({
      _id: id,
    });
  }

  async downloadExcel(userId: string) {
    this.logger.log(`Get usage by group of user ${JSON.stringify(userId)}`);
    const usages = await this.expenseModel
      .find({
        user_id: userId,
      })
      .sort({ created: -1 })
      .exec();

    const data = usages.map((usage) => ({
      category: usage.category,
      amount: usage.amount,
      date: usage.created?.toISOString?.() ?? usage.created,
      description: usage.description,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, 'Usage');

    // ✅ Write workbook to buffer (not to file)
    const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

    this.logger.log(`Excel generated for user ${userId}`);
    return buffer;
  }
}
