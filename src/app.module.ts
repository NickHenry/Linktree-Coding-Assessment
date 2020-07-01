import { Module } from '@nestjs/common';
import { LinkController } from './links/link.controller';

@Module({
  imports: [],
  controllers: [LinkController],
  providers: [],
})
export class AppModule {}
