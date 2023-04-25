import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    return this.usersRepository.save(user);
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: {email: email} })
  }

  async findOneOrCreate(user: Partial<User>) {
    const existingUser = await this.findOne(user.email);
    if (existingUser) {
      return existingUser;
    }
    return this.create(user);
  }
}
