import { Module } from '@nestjs/common';
import { APIResponse } from './response';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from './auth/jwt.module';
import { toNumber } from './helper';
import { toOrder } from './helper/db.helper';

@Module({
  imports: [DatabaseModule, JwtModule],
  providers: [
    APIResponse,
    {
      provide: 'toNumber',
      useValue: toNumber,
    },
    {
      provide: 'toOrder',
      useValue: toOrder,
    },
  ],
  exports: [APIResponse],
})
export class UtilModule {}
