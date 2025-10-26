import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '../user/schemas/user.schema';
import { DatabaseModule } from '@app/util/database';
import {
  UserPassword,
  UserPasswordSchema,
} from '../user/schemas/user-password.schema';
import { JwtModule } from '@app/util/auth';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';

@Module({
  imports: [
    JwtModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserPassword.name,
        schema: UserPasswordSchema,
      },
    ]),
    // MailerModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     transport: {
    //       host: configService.get<string>('SMTP_SERVER'),
    //       auth: {
    //         user: configService.get<string>('SMTP_USER'),
    //         pass: configService.get<string>('SMTP_PASSWORD'),
    //       },
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GenerateTokensProvider, RefreshTokensProvider],
})
export class AuthModule {}
