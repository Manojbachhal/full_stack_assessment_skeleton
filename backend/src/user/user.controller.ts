import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getData() {
    return 'fdgd';
  }

  @Get('find-all')
  findAllUsers() {
    return this.userService.findAll();
  }

  @Get('find-by-home')
  findByHome(@Query('streetAddress') street_address: string) {
    return this.userService.findUsersByHome(street_address);
  }
}
