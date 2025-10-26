import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { IncomeModule } from './income/income.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { FileModule } from './file/file.module';
import * as Joi from 'joi';
import { UsageModule } from './usage/usage.module';
import { DashboardModule } from './dashboard/dashboard.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_SALT: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRE: Joi.number().required(),
        JWT_ACCESS_TOKEN_EXPIRE: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        SMTP_SERVER: Joi.string().required(),
        SMTP_USER: Joi.string().required(),
        SMTP_PASSWORD: Joi.string().required(),
      }),
    }),
    UserModule,
    UsageModule,
    AuthModule,
    IncomeModule,
    MailModule,
    FileModule,
    DashboardModule,
  ],
})
export class AppModule {}
