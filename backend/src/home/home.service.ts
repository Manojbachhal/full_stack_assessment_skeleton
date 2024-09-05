import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Home } from './home.entity';
import { Repository, In } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Home)
    private readonly homeRepository: Repository<Home>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUser(username: string): Promise<Home[]> {
    return this.homeRepository
      .createQueryBuilder('home')
      .innerJoin('home.users', 'user')
      .where('user.username = :username', { username })
      .getMany();
  }
  async findHomesByUsername(username: string, page: number): Promise<User[]> {
    const users = await this.userRepository.find({
      where: { username },
      relations: ['homes'],
    });

    let totalPages = Math.ceil(
      users.reduce((sum, user) => sum + user.homes.length, 0) / 50,
    );
    return users.map((user) => ({
      ...user,
      homes: user.homes.slice(50 * (page - 1), page * 50),
      totalPages,
    }));
  }

  async updateUsers({
    users,
    street_address,
  }: {
    users: string[];
    street_address: string;
  }): Promise<{ message: string; updatedHomes?: Home[] }> {
    // Find the home based on street_address
    const home = await this.homeRepository.findOne({
      where: { streetAddress: street_address },
      relations: ['users'], // Assuming 'users' is the relationship field
    });

    if (!home) {
      return { message: 'Home not found' };
    }

    // Filter users that should remain (those who are checked)
    const remainingUsers = await this.userRepository.findBy({
      username: In(users),
    });

    // Update the home users list
    home.users = remainingUsers;

    // Save the home with updated user relations
    await this.homeRepository.save(home);

    return { message: 'Home updated successfully', updatedHomes: [home] };
  }
}
