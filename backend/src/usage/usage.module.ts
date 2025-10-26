import { Module } from '@nestjs/common';
import { UsageService } from './usage.service';
import { UsageController } from './usage.controller';
import { Usage, UsageSchema } from './schemas/usage.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { DatabaseModule } from '@app/util/database';
import { JwtModule } from '@app/util/auth';

@Module({
  imports: [
    JwtModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: Usage.name,
        schema: UsageSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsageController],
  providers: [UsageService],
  exports: [DatabaseModule.forFeature([
    { name: Usage.name, schema: UsageSchema },
    { name: User.name, schema: UserSchema }
  ])],
})
export class UsageModule { }
