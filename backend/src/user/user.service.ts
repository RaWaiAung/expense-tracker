import {
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { APIResponse } from '@app/util/response';
import { UpdateUserProfileDto } from './dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) { }

  async getAllUsers() {
    this.logger.log(`Get all users`);

    const result = await this.userModel
      .find()
      .select(['-password', '-used_in']);
    this.logger.log('Get all user success');
    return new APIResponse(['Get all user success'], HttpStatus.OK, result);
  }

  async deleteAccountUser(userId: string) {
    const { deletedCount } = await this.userModel.deleteOne({
      _id: userId,
    });

    if (deletedCount == 1) {
      return {
        message: 'User have been deleted',
      };
    }
  }

  async me(userId: string) {
    this.logger.log(`User user with ${JSON.stringify(userId)}`);

    const user = await this.userModel
      .findOne({
        _id: userId,
        removed: false,
      },
      )
      .select(['-password', '-removed', '-enabled', '-created', '-updated'])
      .exec();

    if (!user) throw new NotFoundException('User does not exist');

    this.logger.log('Get user by user id success');
    return new APIResponse(['Get user by id success'], HttpStatus.OK, user);
  }

  async updateProfile(userId: string, data: UpdateUserProfileDto) {
    this.logger.log(`User update profile with ${JSON.stringify(data)}`);

    const { name, email, surname, photo } = data;
    const body = {};
    if (name !== undefined) body['name'] = name;
    if (email !== undefined) body['email'] = email;

    if (surname !== undefined) body['surname'] = surname;
    if (photo !== undefined) body['photo'] = photo;

    const result = await this.userModel
      .findByIdAndUpdate(
        {
          _id: userId,
        },
        {
          $set: body,
        },
        {
          new: true,
        },
      )
      .exec();

    if (!result) throw new NotFoundException('No profile found by this id');

    this.logger.log(`User update profile success`);
    return new APIResponse(
      ['User update profile success'],
      HttpStatus.OK,
      result,
    );
  }
}
