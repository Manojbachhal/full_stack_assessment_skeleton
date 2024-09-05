import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  get() {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findUsersByHome(streetAddress: string): Promise<User[]> {
    return this.userRepository.find({
      // relations: ['homes'],
      where: {
        homes: {
          streetAddress: streetAddress,
        },
      },
    });
  }
}
