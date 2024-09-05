import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Home } from './home.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Home]), TypeOrmModule.forFeature([User])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
