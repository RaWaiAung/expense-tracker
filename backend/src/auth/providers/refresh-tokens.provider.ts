import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { RefreshTokenDto } from '../dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}
  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const data = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        {
          secret: this.configService.get<string>('JWT_SECRET'),
        },
      );

      const user = await this.userModel.findById(data.id);
      return await this.generateTokensProvider.generateToken({
        _id: user._id,
        email: user.email,
      });
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
