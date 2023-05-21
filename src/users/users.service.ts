import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from "argon2";
import { UpdateUserDto } from './dto/update-user.dto';

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
    return this.usersRepository.findOne({ where: { uuid: uuid }, relations: ["profilePicture"] })
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email: email } })
  }

  async update(uuid: string, dto: Partial<User> | UpdateUserDto): Promise<User> {
    await this.usersRepository.update(uuid, dto);
    return this.usersRepository.findOne({ where: { uuid: uuid } });
  }

  async findOneOrCreate(user: Partial<User>) {
    const existingUser = await this.findOne(user.email);
    if (existingUser) {
      return existingUser;
    }
    return this.create(user);
  }
}
