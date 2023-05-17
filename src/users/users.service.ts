import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from "argon2";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) { }

  async create(user: Partial<User>): Promise<User> {
    if (user.password) user.password = await argon2.hash(user.password);
    return this.usersRepository.save(user);
  }

  async findOneByUuid(uuid: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { uuid: uuid } })
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email: email } })
  }

  async update(user: Partial<User>): Promise<User> {
    return this.usersRepository.save(user);
  }

  async findOneOrCreate(user: Partial<User>) {
    const existingUser = await this.findOne(user.email);
    if (existingUser) {
      return existingUser;
    }
    return this.create(user);
  }
}
