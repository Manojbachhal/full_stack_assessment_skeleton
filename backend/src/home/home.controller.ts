import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get('find-by-user')
  findUserByHome(@Query('user') user: string, @Query('page') page: number) {
    return this.homeService.findHomesByUsername(user, page);
  }
  @Post('update-users')
  updateUsers(
    @Body() userUpdates: { users: string[]; street_address: string },
  ) {
    return this.homeService.updateUsers(userUpdates);
  }
}
