import {
  BadRequestException,
  ForbiddenException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateAuthDto,
  RefreshTokenDto,
  UpdatePasswordDto,
  UpdateProfilePasswordDto,
  UserLoginDto,
} from './dto';

import { InjectModel } from '@nestjs/mongoose';
import { User, UserRole } from '../user/schemas/user.schema';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { APIResponse } from '@app/util/response';
import { UserPassword } from '../user/schemas/user-password.schema';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { MailService } from 'src/mail/providers/mail.service';
import { profile } from 'console';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(UserPassword.name)
    private readonly userPasswordModel: Model<UserPassword>,
    private readonly generateTokensProvider: GenerateTokensProvider,
    private readonly refreshTokensProvider: RefreshTokensProvider,
    private configService: ConfigService,
    private readonly mailService: MailService,
  ) {}
  async signup(data: CreateAuthDto) {
    this.logger.log(`Created New User with ${JSON.stringify(data)}`);
    try {
      const { name, email, profileImageUrl, user_role, password } = data;
      const isAlreadyExistUser = await this.userModel.findOne({
        email,
        removed: false,
      });

      if (isAlreadyExistUser) {
        throw new BadRequestException(
          'User with email have been already existed!',
        );
      }
      // generate the password hash
      const salt = this.configService.get<string>('JWT_SALT');

      const hashpassword = await bcrypt.hash(password, +salt);
      // save the new user in the db
      const user = await this.userModel.create({
        fullName: name,
        email: email,
        profileImageUrl: profileImageUrl,
        user_role: user_role || UserRole.User,
      });

      const AdminPasswordData = {
        password: hashpassword,
        emailVerified: true,
        salt: salt,
        user: user._id,
      };
      await this.userPasswordModel.create(AdminPasswordData);

      const payload = {
        id: user.id,
        email: user.email,
      };

      const { accessToken, refreshToken } =
        await this.generateTokensProvider.generateToken(payload);
      const response = {
        _id: user.id,
        username: user.fullName,
        email: user.email,
        accessToken,
        refreshToken,
        role: user.user_role,
      };
      // await this.mailService.sendUserWelcome(user);
      this.logger.log('Success New User Created');
      return new APIResponse(
        ['Create New User Success'],
        HttpStatus.CREATED,
        response,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async signin(data: UserLoginDto) {
    this.logger.log(`User Sign In with ${JSON.stringify(data)}`);

    const { email, password } = data;
    // find the user by email
    const isUser = await this.userModel.findOne({
      email: email,
      removed: false,
    });

    // if user does not exist throw exception
    if (!isUser) {
      throw new NotFoundException(
        'No account with this email has been registered.',
      );
    }

    const databasePassword = await this.userPasswordModel.findOne({
      user: isUser._id,
      removed: false,
    });

    // compare password
    const isMatch = await bcrypt.compare(password, databasePassword.password);

    // if password incorrect throw exception
    if (!isMatch) throw new ForbiddenException('Credentials incorrect');
    const payload = {
      id: isUser.id,
      email: isUser.email,
    };
    const { accessToken, refreshToken } =
      await this.generateTokensProvider.generateToken(payload);
    const response = {
      _id: isUser.id,
      username: isUser.fullName,
      email: isUser.email,
      profileImageUrl: isUser.profileImageUrl,
      accessToken,
      refreshToken,
      role: isUser.user_role,
    };
    this.logger.log('Successfully login user');
    return new APIResponse(
      ['Successfully login user'],
      HttpStatus.OK,
      response,
    );
  }

  async updatePassword(userId: string, data: UpdatePasswordDto) {
    this.logger.log(
      `User update password by this id ${JSON.stringify(userId)}`,
    );
    const { password } = data;
    if (password.length < 8)
      throw new BadRequestException(
        'The password needs to be at least 8 characters long',
      );

    const salt = this.configService.get<string>('JWT_SALT');

    const hashpassword = await bcrypt.hash(password, +salt);

    const UserPasswordData = {
      password: hashpassword,
      salt: salt,
    };

    const resultPassword = await this.userPasswordModel
      .findOneAndUpdate(
        {
          user: new Types.ObjectId(userId),
        },
        { $set: UserPasswordData },
        {
          new: true,
        },
      )
      .exec();

    if (!resultPassword)
      throw new ForbiddenException("User Password couldn't save correctly");

    this.logger.log('User update password success');
    return new APIResponse(['User update password success'], HttpStatus.OK);
  }

  async updateProfilePassword(userId: string, data: UpdateProfilePasswordDto) {
    this.logger.log(
      `User update profile password by this id ${JSON.stringify(userId)}`,
    );

    const { password, passwordCheck } = data;
    if (password.length < 8)
      throw new BadRequestException(
        'The password needs to be at least 8 characters long',
      );
    if (password !== passwordCheck)
      throw new BadRequestException(
        'Enter the same password twice for verification.',
      );

    const salt = this.configService.get<string>('JWT_SALT');

    const hashpassword = await bcrypt.hash(password, +salt);

    const UserPasswordData = {
      password: hashpassword,
      salt: salt,
    };

    const resultPassword = await this.userPasswordModel
      .findOneAndUpdate(
        {
          user: new Types.ObjectId(userId),
        },
        { $set: UserPasswordData },
        {
          new: true,
        },
      )
      .exec();

    if (!resultPassword)
      throw new ForbiddenException("User Password couldn't save correctly");
    this.logger.log('User update profile password success');
    return new APIResponse(
      ['User update profile password success'],
      HttpStatus.OK,
    );
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokensProvider.refreshToken(refreshTokenDto);
  }
}
