import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import LinkRepository from './repository/link.repository';
import UserRepository from './repository/user.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [LinkRepository, UserRepository],
})
export class AppModule {}
