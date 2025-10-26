import { Module } from '@nestjs/common';

import { ServeStaticModule } from '@nestjs/serve-static';
import { FileController } from './file.controller';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads', // this matches the URL path
    }),
  ],
  controllers: [FileController],
})
export class FileModule {}
