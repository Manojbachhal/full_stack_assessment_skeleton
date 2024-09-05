import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Home } from 'src/home/home.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Home])],
  exports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
