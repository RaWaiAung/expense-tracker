import { Module } from '@nestjs/common';
import { IncomeService } from './income.service';
import { IncomeController } from './income.controller';
import { Income, IncomeSchema } from './schemas/income.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { DatabaseModule } from '@app/util/database';
import { JwtModule } from '@app/util/auth';

@Module({
  imports: [
    JwtModule,
    DatabaseModule,
    DatabaseModule.forFeature([
      {
        name: Income.name,
        schema: IncomeSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [IncomeController],
  providers: [IncomeService],
  exports: [DatabaseModule.forFeature([
    { name: Income.name, schema: IncomeSchema },
    { name: User.name, schema: UserSchema }
  ])],
})
export class IncomeModule { }
