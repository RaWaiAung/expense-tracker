import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async signToken(payload: any, expiresIn: number): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      expiresIn,
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }

  async generateToken(payload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(
        payload,
        this.configService.get<number>('JWT_ACCESS_TOKEN_EXPIRE'),
      ),
      this.signToken(
        payload,
        this.configService.get<number>('JWT_REFRESH_TOKEN_EXPIRE'),
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
